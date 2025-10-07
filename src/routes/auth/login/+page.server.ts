import type { Actions, RequestEvent } from '@sveltejs/kit';
import { redirect, fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const { request, cookies } = event;
		const form = await request.formData();
		const username = form.get('username') as string;
		const password = form.get('password') as string;

		// Stuur login request naar je backend
		const res = await fetch('http://localhost:3000/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const data = await res.json();

		if (data.success) {
			cookies.set('token', data.token, {
				httpOnly: true,
				path: '/',
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24
			});

			// redirect naar /modules bij succes
			throw redirect(303, '/modules');
		}

		// fail() houdt de page open en geeft data terug
		return fail(400, { error: data.message });
	}
};
