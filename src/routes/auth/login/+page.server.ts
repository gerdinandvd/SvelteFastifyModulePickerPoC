import type { Actions, RequestEvent } from '@sveltejs/kit';
import { redirect, fail } from '@sveltejs/kit';

const baseUrl =
	process.env.NODE_ENV === 'production'
		? 'https://mijnbackenddemo3.loca.lt'
		: 'http://localhost:3000';

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const { request, cookies } = event;
		const form = await request.formData();
		const username = form.get('username') as string;
		const password = form.get('password') as string;

		let res;

		try {
			res = await fetch(`${baseUrl}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
				credentials: 'include'
			});
		} catch (err) {
			return fail(503, {
				error: 'De service is tijdelijk niet beschikbaar. Probeer het later opnieuw.'
			});
		}

		if (!res.ok) {
			let message = 'Er is iets misgegaan bij het inloggen.';
			if (res.status === 401) message = 'Ongeldige gebruikersnaam of wachtwoord.';
			if (res.status === 500) message = 'Interne serverfout. Probeer het later opnieuw.';
			return fail(res.status, { error: message });
		}

		const setCookieHeader = res.headers.get('set-cookie');

		const setCookies = parseSetCookie(setCookieHeader);
		const refreshToken = setCookies['refreshToken'];

		const data = await res.json();

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

		throw redirect(303, '/modules');
	}
};

function parseSetCookie(setCookieHeader: string | null): Record<string, string> {
	if (!setCookieHeader) return {};

	const cookies: Record<string, string> = {};

	const parts = setCookieHeader.split(/; */);
	const [nameValue, ...rest] = parts;
	const [name, value] = nameValue.split('=');
	cookies[name] = value;
	return cookies;
}
