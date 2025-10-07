import type { GetModuleResponse } from '../../../../fastify-api/infrastructure/Types/modules.types';
import type { PageServerLoad } from './$types';
import type { Actions, RequestEvent } from '@sveltejs/kit';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const nameId = event.params.module_id; // uit de URL

	console.log('|', nameId, '|');

	const token = event.cookies.get('token');

	if (!token) {
		throw redirect(404, '/auth/login');
	}

	// Gebruik de URL parameter in je fetch
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
		const isFavoredRaw = formData.get('is_favored');
		const isFavored = isFavoredRaw === 'true'; // converteert naar boolean
		const token = cookies.get('token');

		console.log(JSON.stringify({ isFavored }));

		const response = await fetch(`http://localhost:3000/modules/${moduleId}/favored`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ is_favored: isFavored })
		});

		const result = await response.json();
		console.log(result);
		// Hier wat doen met 'result'
	}
};
