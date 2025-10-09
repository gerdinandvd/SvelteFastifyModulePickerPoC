import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import modulesRoutes from './routes/modulesRoutes.ts';
import authRoutes from './routes/authRoutes.ts';
import { connectDB } from './mongoose.ts';
import aboutRoutes from './routes/aboutRoutes.ts';
import dotenv from 'dotenv';
import authenticate from './domain/services/middleware/authenticate.ts';
import fastifyCors from '@fastify/cors';
import formbody from '@fastify/formbody';

async function main() {
	dotenv.config();

	const MONGODB_URL = process.env.MONGODB_URI!;
	const JWT_SECRET = process.env.JWT_SECRET!;

	await connectDB(MONGODB_URL);

	const fastify = Fastify({ logger: true });
	fastify.register(jwt, { secret: JWT_SECRET });

	fastify.register(authenticate);

	fastify.register(fastifyCors, {
		origin: 'http://localhost:5173',
		credentials: true
	});
	fastify.register(formbody);

	fastify.register(aboutRoutes, { prefix: 'about' });
	fastify.register(authRoutes, { prefix: 'auth' });
	fastify.register(modulesRoutes, { prefix: 'modules' });

	await fastify.listen({ port: 3000 });
}

main();
