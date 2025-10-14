// Nu importeer je pas de modules die authRoutes laden
import fastify from 'fastify';
import authRoutes from '../../routes/authRoutes.ts';
import { Login } from '../../services/authUser.ts'; // dit is nu de mock
import cookie from '@fastify/cookie';

import { vi, expect, beforeEach, it } from 'vitest';

vi.mock('../../services/authUser.ts', () => ({
	Login: vi.fn()
}));

let app: ReturnType<typeof fastify>;

beforeEach(async () => {
	app = fastify();
	await app.register(cookie);

	// mock jwt plugin
	app.decorate('jwt', {
		verify: vi.fn()
	});

	app.decorateReply('jwtSign', async function () {
		return 'new-access-token';
	});
	app.register(authRoutes);

	await app.ready();
});

it('should return 401 if no refreshtoken is present', async () => {
	const response = await app.inject({
		method: 'POST',
		url: '/refresh',
		cookies: {} // geen refreshToken
	});

	expect(response.statusCode).toBe(401);
	expect(JSON.parse(response.payload)).toEqual({ error: 'No refresh token' });
});

it('should return 404 if refreshToken is invalid', async () => {
	(app.jwt.verify as any).mockImplementation(() => {
		throw new Error('Invalid token');
	});

	const response = await app.inject({
		method: 'POST',
		url: '/refresh',
		cookies: { refreshToken: 'fake-token' }
	});

	expect(response.statusCode).toBe(401);
	expect(JSON.parse(response.payload)).toEqual({ error: 'Invalid refresh token' });
});

it('should return 200 if refreshToken is valid', async () => {
	(app.jwt.verify as any).mockResolvedValue({ user_id: '123' });

	const response = await app.inject({
		method: 'POST',
		url: '/refresh',
		cookies: { refreshToken: 'valid-token' }
	});

	console.log('Response status:', response.statusCode);
	console.log('Response payload:', response.payload);

	expect(response.statusCode).toBe(200);
	expect(JSON.parse(response.payload)).toEqual({ accessToken: 'new-access-token' });
});

it('should return 200 and a success message when logging out', async () => {
	const response = await app.inject({
		method: 'POST',
		url: '/logout'
	});

	expect(response.statusCode).toBe(200);
	expect(JSON.parse(response.payload)).toEqual({
		message: 'Logged out successfully'
	});
});

it('should return 401 when login credentials are invalid when logging in', async () => {
	(Login as any).mockResolvedValue({ success: false });
	const response = await app.inject({
		method: 'POST',
		url: '/login',
		body: {
			username: 'testname',
			password: 'testword'
		}
	});
	expect(response.statusCode).toBe(401);
});

it('should return 200 when login credentials are valid when loggin in', async () => {
	(Login as any).mockResolvedValue({ success: true });
	const response = await app.inject({
		method: 'POST',
		url: '/login',
		body: {
			username: 'testname',
			password: 'testword'
		}
	});
	expect(JSON.parse(response.payload)).toEqual({ accessToken: 'new-access-token' });
	expect(response.cookies).toHaveLength(1);
	expect(response.cookies[0]).toEqual({
		name: 'refreshToken',
		value: 'new-access-token',
		path: '/',
		httpOnly: true,
		sameSite: 'Lax'
	});
});

it('should return 200 when login credentials are valid when loggin in', async () => {
	const originalEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = 'production';
	(Login as any).mockResolvedValue({ success: true });
	const response = await app.inject({
		method: 'POST',
		url: '/login',
		body: {
			username: 'testname',
			password: 'testword'
		}
	});
	expect(JSON.parse(response.payload)).toEqual({ accessToken: 'new-access-token' });
	expect(response.cookies).toHaveLength(1);
	console.log(response.cookies[0]);
	expect(response.cookies[0]).toMatchObject({
		name: 'refreshToken',
		sameSite: 'None', // of 'lax' afhankelijk van NODE_ENV
		value: 'new-access-token',
		httpOnly: true,
		secure: true,
		path: '/'
	});

	process.env.NODE_ENV = originalEnv;
});
