import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface SearchQuery {
	module_request?: string;
}

async function authRoutes(fastify: FastifyInstance) {
	fastify.get('/', async () => ({ Here_is_all: 'modules' }));
	fastify.get(
		'/search',
		async (request: FastifyRequest<{ Querystring: SearchQuery }>, reply: FastifyReply) => {
			const module_request = request.query.module_request;
			reply.send({ module_request });
		}
	);
}

export default authRoutes;
