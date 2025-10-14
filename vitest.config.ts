import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['fastify-api/tests/**/*.test.ts'],

		exclude: [
			'node_modules/**',
			'tests/**',
			'fastify-api/migrations/**',
			'fastify-api/scripts/**',
			'src/**'
		],
		coverage: {
			all: true,
			include: ['fastify-api'],
			exclude: [
				'fastify-api/tests/**/*.ts',
				'node_modules',
				'tests/**',
				'fastify-api/index.ts',
				'fastify-api/mongoose.ts'
			]
		}
	}
});
