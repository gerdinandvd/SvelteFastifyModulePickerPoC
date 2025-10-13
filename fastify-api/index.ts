import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import modulesRoutes from './routes/modulesRoutes.ts';
import authRoutes from './routes/authRoutes.ts';
import { connectDB } from './mongoose.ts';
import aboutRoutes from './routes/aboutRoutes.ts';
import dotenv from 'dotenv';
import authenticate from './services/middleware/authenticate.ts';
import fastifyCors from '@fastify/cors';
import formbody from '@fastify/formbody';
import localtunnel from 'localtunnel';

async function main() {
	dotenv.config();

	const MONGODB_URI = process.env.MONGODB_URI!;
	const JWT_SECRET = process.env.JWT_SECRET!;
	const Cookie_SECRET = process.env.Cookie_SECRET!;

	await connectDB(MONGODB_URI);

	const fastify = Fastify({ logger: true });
	fastify.register(jwt, {
		secret: JWT_SECRET,
		cookie: {
			cookieName: 'refreshToken',
			signed: false
		}
	});

	fastify.register(cookie, {
		secret: Cookie_SECRET
		//parseOptions: {}
	});

	fastify.register(authenticate);

	fastify.register(fastifyCors, {
		origin: [
			'https://sveltefastifymodulepickerpoc-production.up.railway.app',
			'https://mijnbackenddemo3.loca.lt/',
			'http://localhost:5173'
		],
		credentials: true
	});

	fastify.register(formbody);

	fastify.register(aboutRoutes, { prefix: 'about' });
	fastify.register(authRoutes, { prefix: 'auth' });
	fastify.register(modulesRoutes, { prefix: 'modules' });

	await fastify.listen({ port: 3000 });

	const tunnel = await localtunnel({ port: 3000, subdomain: 'mijnbackenddemo3' });

	console.log(`🌍 Public URL: ${tunnel.url}`);

	tunnel.on('close', () => {
		console.log('Tunnel closed');
	});
}

main();
