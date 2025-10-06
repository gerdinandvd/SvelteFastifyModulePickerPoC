import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import getModulesResponseJsonSchema from '../infrastructure/Schema/respons.multiple.module.schema.ts';

import moduleRoutes from './module/moduleRoutes.ts';

import type { GetModulesRoute, GetSearchModulesRoutes } from '../infrastructure/Types/route.types';

import { GetAllModules, SearchForModules } from '../domain/services/ModulesService.ts';

const opts = {
	schema: {
		response: {
			200: getModulesResponseJsonSchema
		}
	}
};

async function ModulesRoutes(fastify: FastifyInstance) {
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

	fastify.register(moduleRoutes, { prefix: '/:moduleId' });
}

export default ModulesRoutes;
