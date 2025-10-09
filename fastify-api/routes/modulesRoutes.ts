import type { FastifyInstance } from 'fastify';
import ModulesListResponseSchema from '../../domain/schema/modules-list.response.schema.ts';
import FavoriteModulesResponseSchema from '../../domain/schema/favorite-modules.response.schema.ts';

import GetDetailsOfModule from './module/moduleRoutes.ts';

import type {
	GetModulesRoute,
	GetSearchModulesRoute,
	GetFavoriteModulesRoute
} from '../../infrastructure/types/route.types.ts';

import {
	GetAllModules,
	SearchForModules,
	GetAllFavoriteModules
} from '../services/ModulesService.ts';
import { Types } from 'mongoose';

async function ModulesRoutes(fastify: FastifyInstance) {
	const opts1 = {
		schema: {
			response: {
				200: ModulesListResponseSchema
			}
		},
		preHandler: [fastify.authenticate]
	};

	const opts2 = {
		schema: {
			response: {
				200: FavoriteModulesResponseSchema
			}
		},
		preHandler: [fastify.authenticate]
	};

	fastify.get<GetModulesRoute>('/', opts1, async (request, reply) => {
		const modules = await GetAllModules();

		reply.send(modules);
	});

	fastify.get<GetSearchModulesRoute>('/search', opts1, async (request, reply) => {
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
