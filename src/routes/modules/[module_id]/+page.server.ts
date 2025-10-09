import type { GetModuleResponse } from '../../../../infrastructure/Types/modules.types';
import type { PageServerLoad } from './$types';
import type { Actions, RequestEvent } from '@sveltejs/kit';
import { redirect, fail } from '@sveltejs/kit'; //

export const load: PageServerLoad = async (event) => {
	const nameId = event.params.module_id;

	console.log('|', nameId, '|');

	const token = event.cookies.get('token');

	if (!token) {
		throw redirect(404, '/auth/login');
	}

	const res = await fetch(`http://localhost:3000/modules/${nameId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});

	if (res.status == 404) {
		throw redirect(404, '/auth/login');
	}

	if (!res.ok) {
		throw redirect(500, '/modules');
	}

	const fetched_data: GetModuleResponse = await res.json();

	return {
		fetched_data
	};
};

export const actions: Actions = {
	default: async ({ params, request, cookies }: RequestEvent) => {
		const moduleId = params.module_id;
		const formData = await request.formData();
		const isFavored = formData.get('is_favored') === 'true';
		const token = cookies.get('token');

		await fetch(`http://localhost:3000/modules/${moduleId}/favored`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ is_favored: isFavored })
		});

		//throw redirect(303, `/modules/${moduleId}`);
	}
};
