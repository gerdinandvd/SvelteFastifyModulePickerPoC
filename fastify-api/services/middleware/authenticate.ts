import fp from 'fastify-plugin';
import type { FastifyReply, FastifyRequest } from 'fastify';

export default fp(async (fastify) => {
	fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			console.log('we gaan nu verifieren!');
			await request.jwtVerify();
		} catch (err) {
			reply.code(401).send({ error: 'Unauthorized' });
		}
	});
});
