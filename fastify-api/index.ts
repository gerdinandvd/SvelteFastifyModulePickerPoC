import Fastify from 'fastify';
import registerRoutes from './routes/aboutRoutes.ts';
import modulesRoutes from './routes/modulesRoutes.ts';
import authRoutes from './routes/authRoutes.ts';
import { connectDB } from './mongoose.ts';
import aboutRoutes from './routes/aboutRoutes.ts';

// async function hashPassword(password: string) {
//     const saltRounds = 10;
//     const hashed = await hash(password, saltRounds);
//     console.log("Hashed password:", hashed);
//     return hashed;
// }

async function main() {
	// const password = "secret";
	// const hashed = await hashPassword(password);

	//     const match = await compare(password, hashed);
	// console.log("Password match?", match);

	await connectDB(); // Verbinding maken

	const fastify = Fastify({ logger: true });
	fastify.register(aboutRoutes, { prefix: 'about' });
	fastify.register(authRoutes, { prefix: 'auth' });
	fastify.register(modulesRoutes, { prefix: 'modules' });

	await fastify.listen({ port: 3000 });
}

// import { hash, compare } from 'bcrypt-ts'

main();
