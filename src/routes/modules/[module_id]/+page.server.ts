import { fetchWithAuth } from '$lib/api';
import type { GetModuleResponse } from '../../../../infrastructure/Types/modules.types';
import type { PageServerLoad } from './$types';
import type { Actions, RequestEvent } from '@sveltejs/kit';
import { redirect, fail } from '@sveltejs/kit'; //

export const load: PageServerLoad = async ({ params, cookies }) => {
	const nameId = params.module_id;

	const endpoint = `/modules/${nameId}`;

	const res = await fetchWithAuth(endpoint, cookies);

	if (!res.ok) {
		throw fail(500, '/modules');
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

		const endpoint = `/modules/${moduleId}/favored`;

		const options = {
			method: 'POST',
			body: JSON.stringify({ is_favored: isFavored }),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await fetchWithAuth(endpoint, cookies, options);

		if (!res.ok) {
			throw fail(500, `/modules/${moduleId}`);
		}
	}
};
