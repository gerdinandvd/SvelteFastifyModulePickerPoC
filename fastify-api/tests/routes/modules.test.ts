import fastify from 'fastify';
import modulesRoutes from '../../routes/modulesRoutes.ts';
import type { FastifyReply, FastifyRequest } from 'fastify';
import {
	GetAllModules,
	SearchForModules,
	GetAllFavoriteModules
} from '../../services/ModulesService.ts';

import cookie from '@fastify/cookie';

import { vi, expect, beforeEach, it } from 'vitest';

import {} from '../../services/ModulesService.ts';

const favoriteModules = [
	{
		_id: 'test',
		name: 'test'
	},
	{
		_id: 'test',
		name: 'test'
	}
];

const multipleModules = [
	{
		level: 'test',
		_id: 'test',
		name: 'test',
		basic_description: 'test',
		credits: '0'
	},
	{
		level: 'test',
		_id: 'test',
		name: 'test',
		basic_description: 'test',
		credits: '0'
	}
];

vi.mock('../../services/ModulesService.ts', () => ({
	GetAllModules: vi.fn(),
	SearchForModules: vi.fn(),
	GetAllFavoriteModules: vi.fn()
}));

let app: ReturnType<typeof fastify>;

beforeEach(async () => {
	app = fastify();

	await app.register(cookie);

	app.decorate('authenticate', async (request: FastifyRequest) => {
		request.user = { user_id: '1234567890abcdef12345678' };
	});

	app.register(modulesRoutes);

	await app.ready();
});

it('should return all modules and 200', async () => {
	(GetAllModules as any).mockResolvedValue(multipleModules);

	const response = await app.inject({
		method: 'GET',
		url: '/'
	});

	expect(JSON.parse(response.payload)).toEqual(multipleModules);
	expect(response.statusCode).toBe(200);
});

it('search for it and the query is valid', async () => {
	(SearchForModules as any).mockResolvedValue(multipleModules);

	const response = await app.inject({
		method: 'GET',
		url: '/search?module_request=AI'
	});

	expect(JSON.parse(response.payload)).toEqual(multipleModules);
	expect(response.statusCode).toBe(200);
});

it('search for it and the query is undefined', async () => {
	(GetAllModules as any).mockResolvedValue(multipleModules);

	const response = await app.inject({
		method: 'GET',
		url: '/search'
	});

	expect(JSON.parse(response.payload)).toEqual(multipleModules);
	expect(response.statusCode).toBe(200);
});

it('search for it and the query is undefined', async () => {
	(GetAllFavoriteModules as any).mockResolvedValue(favoriteModules);

	const response = await app.inject({
		method: 'GET',
		url: '/favorites'
	});

	expect(JSON.parse(response.payload)).toEqual(favoriteModules);
	expect(response.statusCode).toBe(200);
});
