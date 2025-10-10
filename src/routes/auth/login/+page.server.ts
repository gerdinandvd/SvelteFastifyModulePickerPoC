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
			body: JSON.stringify({ username, password }),
			credentials: 'include'
		});

		const setCookieHeader = res.headers.get('set-cookie');

		const setCookies = parseSetCookie(setCookieHeader);
		const refreshToken = setCookies['refreshToken'];

		const data = await res.json();

		if (data) {
			cookies.set('accessToken', data.accessToken, {
				httpOnly: true,
				path: '/',
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 15
			});

			cookies.set('refreshToken', refreshToken, {
				httpOnly: true,
				path: '/',
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});

			// redirect naar /modules bij succes
			throw redirect(303, '/modules');
		}

		// fail() houdt de page open en geeft data terug
		return fail(400, 'er is iets misgegaan');
	}
};

function parseSetCookie(setCookieHeader: string | null): Record<string, string> {
	if (!setCookieHeader) return {};

	const cookies: Record<string, string> = {};
	// split op comma + ; is tricky, dus beter per cookie
	const parts = setCookieHeader.split(/; */); // split op ; met optionele spaties
	const [nameValue, ...rest] = parts;
	const [name, value] = nameValue.split('=');
	cookies[name] = value;
	return cookies;
}
