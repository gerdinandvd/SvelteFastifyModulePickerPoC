import mongoose from 'mongoose';
import Fastify from 'fastify';
import dotenv from 'dotenv';
import registerRoutes from './routes/registerRoutes.ts';
import modulesRoutes from './routes/modulesRoutes.ts';
import authRoutes from './routes/authRoutes.ts';

dotenv.config();

const uri = process.env.MONGODB_URL!;
const clientOptions = {
	serverApi: { version: '1' as const, strict: true, deprecationErrors: true }
};

async function main() {
	try {
		await mongoose.connect(uri, clientOptions);
		console.log('Connected to MongoDB!');

		const fastify = Fastify({ logger: true });
		fastify.register(registerRoutes);
		fastify.register(authRoutes, { prefix: 'auth' });
		fastify.register(modulesRoutes, { prefix: 'modules' });

		await fastify.listen({ port: 3000 });
		console.log('Fastify server running on http://localhost:3000');
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

main();
