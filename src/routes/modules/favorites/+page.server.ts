import { fetchWithAuth } from '$lib/api';
import type { GetFavoriteModulesResponse } from '../../../../infrastructure/Types/modules.types';
import type { PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

const baseUrl =
	process.env.NODE_ENV === 'production'
		? 'https://mijnbackenddemo3.loca.lt'
		: 'http://localhost:3000';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const endpoint = `${baseUrl}/modules/favorites`;
	const res = await fetchWithAuth(endpoint, cookies);

	if (!res.ok) {
		throw fail(500, '/modules');
	}

	const fetched_data: GetFavoriteModulesResponse = await res.json();

	return {
		fetched_data
	};
};
