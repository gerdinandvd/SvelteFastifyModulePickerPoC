import type { FastifyInstance } from 'fastify';
import getModulesResponseJsonSchema from '../infrastructure/Schema/respons.multiple.module.schema.ts';
import getFavoriteModulesJsonSchema from '../infrastructure/Schema/respons.favorite.modules.schema.ts';

import GetDetailsOfModule from './module/moduleRoutes.ts';

import type {
	GetModulesRoute,
	GetSearchModulesRoutes,
	GetFavoriteModulesRoute
} from '../infrastructure/Types/route.types';

import {
	GetAllModules,
	SearchForModules,
	GetAllFavoriteModules
} from '../domain/services/ModulesService.ts';
import { Types } from 'mongoose';

async function ModulesRoutes(fastify: FastifyInstance) {
	const opts1 = {
		schema: {
			response: {
				200: getModulesResponseJsonSchema
			}
		},
		preHandler: [fastify.authenticate]
	};

	const opts2 = {
		schema: {
			response: {
				200: getFavoriteModulesJsonSchema
			}
		},
		preHandler: [fastify.authenticate]
	};

	fastify.get<GetModulesRoute>('/', opts1, async (request, reply) => {
		const modules = await GetAllModules();

		reply.send(modules);
	});

	fastify.get<GetSearchModulesRoutes>('/search', opts1, async (request, reply) => {
		const module_request = request.query.module_request;

		if (typeof module_request != 'undefined') {
			reply.send(await SearchForModules(module_request));
		}

		reply.send(await GetAllModules());
	});

	fastify.get<GetFavoriteModulesRoute>('/favorites', opts2, async (request, reply) => {
		console.log(request.user);
		const { user_id } = request.user as { user_id: Types.ObjectId };

		console.log(user_id);
		reply.send(await GetAllFavoriteModules(user_id));
	});

	fastify.register(GetDetailsOfModule, { prefix: '/:moduleId' });
}

export default ModulesRoutes;
