import type { FastifyInstance } from 'fastify';
import type { LoginRoute } from '../infrastructure/Types/route.types';
import loginSchema from '../infrastructure/Schema/login.schema.ts';
import responseJsonSchema from '../infrastructure/Schema/respons.schema.ts';
import { Login } from '../domain/services/authUser.ts'

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

      const success = await Login(username, password)
      
      reply.send({ message: `${username } resul:`, success: success });
    }
  );

  fastify.get('/login', async () => ({ you_are: 'Logged in' }));
  fastify.get('/logout', async () => ({ you_are: 'Logged out' }));
}

export default authRoutes;
