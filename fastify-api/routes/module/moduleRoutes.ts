import type { FastifyInstance } from 'fastify';
import { GetDetailsOfModule } from '../../domain/services/ModulesService.ts';
import type { GetModuleDetailsRoute } from '../../infrastructure/Types/route.types.ts';
import { Types } from 'mongoose';
import ModuleJsonSchema from '../../infrastructure/Schema/respons.single.module.schema.ts';

const opts = {
	schema: {
		response: {
			200: ModuleJsonSchema
		}
	}
};

export default async function moduleDetailRoutes(fastify: FastifyInstance) {
	// GET /modules/:moduleId
	fastify.get<GetModuleDetailsRoute>('/', opts, async (request, reply) => {
		const { moduleId } = request.params;
		const userstring = new Types.ObjectId('68e391ca990a7d85a530446f'); // enkel voor test, nog JWS Authentication toevoegen, voor user_id

		const _id = new Types.ObjectId(moduleId);

		const response = await GetDetailsOfModule(_id, userstring);

		reply.send(response);
	});
}
