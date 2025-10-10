import type { FastifyInstance } from 'fastify';
import { GetDetailsOfModule, PostModuleIsFavored } from '../../services/ModulesService.ts';
import type {
	GetModuleRoute,
	PostModuleFavoritedRoute
} from '../../../infrastructure/types/route.types.ts';
import { Types } from 'mongoose';
import { ModuleResponseSchema, ApiResponseSchema } from '../../../domain/schema/index.ts';

export default async function moduleDetailRoutes(fastify: FastifyInstance) {
	const opts1 = {
		schema: {
			response: {
				200: ModuleResponseSchema
			}
		},
		preHandler: [fastify.authenticate]
	};
	fastify.get<GetModuleRoute>('/', opts1, async (request, reply) => {
		const { moduleId } = request.params;
		const { user_id } = request.user as { user_id: string };

		const moduleObjectId = new Types.ObjectId(moduleId);
		const userObjectId = new Types.ObjectId(user_id);

		const moduleDetails = await GetDetailsOfModule(moduleObjectId, userObjectId);

		reply.send(moduleDetails);
	});

	const opts2 = {
		schema: {
			response: {
				200: ApiResponseSchema
			}
		},
		preHandler: [fastify.authenticate]
	};

	fastify.post<PostModuleFavoritedRoute>('/favored', opts2, async (request, reply) => {
		const { moduleId } = request.params;
		const { is_favored } = request.body;
		const { user_id } = request.user as { user_id: string };

		const moduleObjectId = new Types.ObjectId(moduleId);
		const userObjectId = new Types.ObjectId(user_id);

		const success = await PostModuleIsFavored(moduleObjectId, userObjectId, is_favored);

		reply.send({ message: 'we hebben update geprobeert: ', success });
	});
}
