// +page.server.ts
import { fetchWithAuth } from '$lib/api';
import type { GetModulesResponse } from '../../../infrastructure/Types/modules.types';
import type { PageServerLoad, Actions } from './$types';
import { redirect, error } from '@sveltejs/kit';

const baseUrl =
	process.env.NODE_ENV === 'production'
		? 'https://mijnbackenddemo3.loca.lt'
		: 'http://localhost:3000';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const search = url.searchParams.get('search');

	const endpoint = search
		? `${baseUrl}/modules/search?module_request=${search}`
		: `${baseUrl}/modules/`;

	const res = await fetchWithAuth(endpoint, cookies);

	if (!res.ok) {
		throw error(res.status, 'Kan modules niet ophalen');
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
