import type { FastifyInstance } from 'fastify';

async function aboutRoutes(fastify: FastifyInstance) {
	fastify.get('/', async () => ({ info: 'Dit is de about route, wat uitleg, of link naar docs' }));
}

export default aboutRoutes;
