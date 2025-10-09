import type { GetFavoriteModulesResponse } from '../../../../fastify-api/infrastructure/Types/modules.types';
import type { PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('token');

	if (!token) {
		throw redirect(404, '/auth/login');
	}

	// Gebruik de URL parameter in je fetch
	const res = await fetch(`http://localhost:3000/modules/favorites`, {
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

	const fetched_data: GetFavoriteModulesResponse = await res.json();

	return {
		fetched_data
	};
};
