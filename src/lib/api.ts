import { redirect } from '@sveltejs/kit';

export async function fetchWithAuth(url: string, cookies: any, options: RequestInit = {}) {
	const accessToken = cookies.get('accessToken');

	let res = await fetch(url, {
		...options,
		headers: {
			...(options.headers || {}),
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		}
	});

	if (res.status === 401) {
		const refreshToken = cookies.get('refreshToken');

		const refreshRes = await fetch('http://localhost:3000/auth/refresh', {
			method: 'POST',
			headers: {
				Cookie: `refreshToken=${refreshToken}` // nog ff kijken waarom het niet automatisch verzonden wordt.
			}
		});

		if (!refreshRes.ok) {
			throw redirect(303, '/auth/login');
		}

		const { accessToken: newToken } = await refreshRes.json();

		cookies.set('accessToken', newToken, {
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 15
		});

		res = await fetch(url, {
			...options,
			headers: {
				...(options.headers || {}),
				Authorization: `Bearer ${newToken}`,
				'Content-Type': 'application/json'
			}
		});
	}

	if (res.status === 401) {
		throw redirect(303, '/auth/login');
	}

	return res;
}
