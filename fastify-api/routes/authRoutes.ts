import type { FastifyInstance } from 'fastify';
import type { PostLoginRoute } from '../../infrastructure/types/route.types.ts';
import { LoginRequestSchema, LoginResponseSchema } from '../../domain/schema/index.ts';
import { Login } from '../services/authUser.ts';
//import fastifyJwt from '@fastify/jwt';

async function authRoutes(fastify: FastifyInstance) {
	fastify.post<PostLoginRoute>(
		'/login',
		{
			schema: {
				body: LoginRequestSchema,
				response: {
					200: LoginResponseSchema
				}
			}
		},
		async (request, reply) => {
			const { username, password } = request.body;

			const { success, user_id } = await Login(username, password);

			if (!success) {
				return reply.code(401); // foutmelding ofzo
			}

			const accessToken = await reply.jwtSign({ user_id }, { expiresIn: '15m' });
			const refreshToken = await reply.jwtSign({ user_id }, { expiresIn: '7d' });

			//const token = await reply.jwtSign({ user_id }, { expiresIn: '1h' });

			return reply
				.setCookie('refreshToken', refreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
					path: '/'
				})
				.send({
					accessToken
				});
		}
	);

	fastify.post('/logout', async (request, reply) => {
		reply.clearCookie('refreshToken', { path: '/' }).send({ message: 'Logged out successfully' });
	});

	type JwtPayload = {
		user_id: string;
	};

	// todo: RefreshRoute
	fastify.post('/refresh', async (request, reply) => {
		try {
			const { refreshToken } = request.cookies;

			if (!refreshToken) {
				return reply.status(401).send({ error: 'No refresh token' });
			}

			const user = await fastify.jwt.verify<JwtPayload>(refreshToken);
			const newAccessToken = await reply.jwtSign({ user_id: user.user_id }, { expiresIn: '15m' });

			return reply.send({ accessToken: newAccessToken });
		} catch (err) {
			return reply.status(401).send({ error: 'Invalid refresh token' });
		}
	});
}

export default authRoutes;
