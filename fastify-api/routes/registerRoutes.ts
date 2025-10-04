import type { FastifyInstance } from 'fastify';

async function registerRoutes(fastify: FastifyInstance) {
	fastify.get('/', async () => ({ hello: 'world' }));
	fastify.get('/about', async () => ({ info: 'Dit is de about route' }));
}

export default registerRoutes;
