import type { FastifyInstance } from 'fastify';

async function aboutRoutes(fastify: FastifyInstance) {
	fastify.get('/', async () => ({ info: 'Dit is de about route' }));
}

export default aboutRoutes;
