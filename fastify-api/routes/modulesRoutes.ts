import type { FastifyInstance } from 'fastify';
import getModulesResponseJsonSchema from '../infrastructure/Schema/respons.multiple.module.schema.ts';

import GetDetailsOfModule from './module/moduleRoutes.ts';

import type { GetModulesRoute, GetSearchModulesRoutes } from '../infrastructure/Types/route.types';

import { GetAllModules, SearchForModules } from '../domain/services/ModulesService.ts';

async function ModulesRoutes(fastify: FastifyInstance) {
	const opts = {
		schema: {
			response: {
				200: getModulesResponseJsonSchema
			}
		},
		preHandler: [fastify.authenticate]
	};

	fastify.get<GetModulesRoute>('/', opts, async (request, reply) => {
		const modules = await GetAllModules();

		reply.send(modules);
	});

	fastify.get<GetSearchModulesRoutes>('/search', opts, async (request, reply) => {
		const module_request = request.query.module_request;

		if (typeof module_request != 'undefined') {
			reply.send(await SearchForModules(module_request));
		}

		reply.send(await GetAllModules());
	});

	fastify.register(GetDetailsOfModule, { prefix: '/:moduleId' });
}

export default ModulesRoutes;
