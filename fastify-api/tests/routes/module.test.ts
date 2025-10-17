import fastify from 'fastify';
import moduleRoutes from '../../routes/module/moduleRoutes.ts';
import type { FastifyReply, FastifyRequest } from 'fastify';

import cookie from '@fastify/cookie';

import { vi, expect, beforeEach, it } from 'vitest';

import { GetDetailsOfModule, PostModuleIsFavored } from '../../services/ModulesService.ts';

const oneModule = {
	name: 'test',
	basic_description: 'test',
	type: 'test',
	level: 'test',
	theme: 'test',
	credits: '0',
	favored: false,
	detailed_description: 'test'
};

vi.mock('../../services/ModulesService.ts', () => ({
	GetDetailsOfModule: vi.fn(),
	PostModuleIsFavored: vi.fn()
}));

let app: ReturnType<typeof fastify>;

beforeEach(async () => {
	app = fastify();

	await app.register(cookie);

	app.decorate('authenticate', async (request: FastifyRequest) => {
		request.user = { user_id: '1234567890abcdef12345678' };
	});

	app.register(moduleRoutes);

	await app.ready();
});

it('should return the moduleDetails with an 200', async () => {
	(GetDetailsOfModule as any).mockResolvedValue(oneModule);
	const response = await app.inject({
		method: 'GET',
		url: '/'
	});

	expect(JSON.parse(response.payload)).toEqual(oneModule);
	expect(response.statusCode).toBe(200);
});

it('should return the favorite modules with an 200', async () => {
	(PostModuleIsFavored as any).mockResolvedValue({
		message: 'we hebben update geprobeert: ',
		success: true
	});
	const response = await app.inject({
		method: 'POST',
		url: '/favored',
		body: {
			is_favored: true
		}
	});
	expect(JSON.parse(response.payload)).toEqual(
		expect.objectContaining({
			message: expect.anything(),
			success: true
		})
	);
});
