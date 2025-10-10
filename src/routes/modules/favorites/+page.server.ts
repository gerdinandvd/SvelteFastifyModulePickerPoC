import { fetchWithAuth } from '$lib/api';
import type { GetFavoriteModulesResponse } from '../../../../infrastructure/Types/modules.types';
import type { PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const endpoint = 'http://localhost:3000/modules/favorites';
	const res = await fetchWithAuth(endpoint, cookies);

	if (!res.ok) {
		throw fail(500, '/modules');
	}

	const fetched_data: GetFavoriteModulesResponse = await res.json();

	return {
		fetched_data
	};
};
