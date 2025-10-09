// +page.server.ts
import type { GetModulesResponse } from '../../../infrastructure/Types/modules.types';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const token = cookies.get('token');
	const search = url.searchParams.get('search');

	if (!token) {
		throw redirect(404, '/auth/login');
	}

	const endpoint = search
		? `http://localhost:3000/modules/search?module_request=${search}`
		: `http://localhost:3000/modules/`;

	const res = await fetch(endpoint, {
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

	const fetched_data: GetModulesResponse = await res.json();
	return { fetched_data, search };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const moduleRequest = formData.get('module_request');

		throw redirect(303, `/modules?search=${moduleRequest}`);
	}
};
