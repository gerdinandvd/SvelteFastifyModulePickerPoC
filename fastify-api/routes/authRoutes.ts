import type { FastifyInstance } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';

const postBodySchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		password: { type: 'string' }
	},
	required: ['name', 'password'],
	additionalProperties: false
} as const;

const responseSchema = {
	type: 'object',
	properties: {
		message: { type: 'string' },
		success: { type: 'boolean' }
	},
	required: ['message', 'success']
} as const;

type PostBody = FromSchema<typeof postBodySchema>;
type PostResponse = FromSchema<typeof responseSchema>;

async function authRoutes(fastify: FastifyInstance) {
	fastify.post<{ Body: PostBody; reply: PostResponse }>(
		'/login',
		{
			schema: {
				body: postBodySchema,
				response: {
					200: responseSchema
				}
			}
		},

		async (request, reply) => {
			const { name, password } = request.body;

			// verify and more

			const message = 'login should happen';
			reply.send({ message, succes: true });
		}
	);

	fastify.get('/login', async () => ({ you_are: 'Logged in' }));
	fastify.get('/logout', async () => ({ you_are: 'Logged out' }));
}

export default authRoutes;
