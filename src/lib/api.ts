import { redirect } from '@sveltejs/kit';

export async function fetchWithAuth(url: string, cookies: any, options: RequestInit = {}) {
	let accessToken = cookies.get('accessToken');
	const refreshToken = cookies.get('refreshToken');

	const API_BASE =
		process.env.NODE_ENV === 'production'
			? 'https://mijnbackenddemo3.loca.lt'
			: 'http://localhost:3000';

	const url_with_base = API_BASE + url;

	if (!accessToken && !refreshToken) {
		throw redirect(303, '/auth/login');
	}

	let res: Response | null = null;

	const fetchWithToken = async (token: string) => {
		return await fetch(url_with_base, {
			...options,
			headers: {
				...(options.headers || {}),
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});
	};

	if (accessToken) {
		res = await fetchWithToken(accessToken);
	}

	if (!res || res.status === 401) {
		if (!refreshToken) {
			throw redirect(303, '/auth/login');
		}

		const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
			method: 'POST',
			headers: {
				Cookie: `refreshToken=${refreshToken}`
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

		accessToken = newToken;

		res = await fetchWithToken(accessToken);
	}

	if (res.status === 401) {
		throw redirect(303, '/auth/login');
	}

	return res;
}
