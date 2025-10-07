import type { FastifyInstance } from 'fastify';
import type { LoginRoute } from '../infrastructure/Types/route.types';
import loginSchema from '../infrastructure/Schema/login.schema.ts';
import responseJsonSchema from '../infrastructure/Schema/respons.login.schema.ts';
import { Login } from '../domain/services/authUser.ts';
import fastifyJwt from '@fastify/jwt';

async function authRoutes(fastify: FastifyInstance) {
	fastify.post<LoginRoute>(
		'/login',
		{
			schema: {
				body: loginSchema,
				response: {
					200: responseJsonSchema
				}
			}
		},
		async (request, reply) => {
			const { username, password } = request.body;

			const { success, user_id } = await Login(username, password);

			if (!success) {
				return reply.code(401).send({ message: 'Invalid credentials', success });
			}

			const token = await reply.jwtSign({ user_id });

			return reply.send({
				message: `Welcome ${username}`,
				token: token,
				success: true
			});
		}
	);

	fastify.get('/verifyjwt', async (request, reply) => {
		await request.jwtVerify();
		return { user: request.user };
	});

	fastify.get('/login', async () => ({ you_are: 'Logged in' }));
	fastify.get('/logout', async () => ({ you_are: 'Logged out' }));

	// fastify.get('/protected', { preHandler: [fastify.authenticate] }, async (request, reply) => {
	// 	return { message: 'You accessed protected content', user: request.user };
	// });
}

export default authRoutes;
