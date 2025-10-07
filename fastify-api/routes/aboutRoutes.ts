import type { FastifyInstance } from 'fastify';

async function aboutRoutes(fastify: FastifyInstance) {
	fastify.get(
		'/',
		{
			preHandler: [fastify.authenticate]
		},
		async () => ({ info: 'Dit is de about route' })
	);
}

export default aboutRoutes;
