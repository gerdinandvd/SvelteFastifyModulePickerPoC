// Nu importeer je pas de modules die authRoutes laden
import fastify from 'fastify';
import aboutRoutes from '../../routes/aboutRoutes.ts';

import { beforeEach, it, expect } from 'vitest';

let app: ReturnType<typeof fastify>;

beforeEach(async () => {
	app = fastify();

	app.register(aboutRoutes);

	await app.ready();
});

it('should have a info key', async () => {
	const response = await app.inject({
		method: 'GET',
		url: '/'
	});

	expect(JSON.parse(response.payload)).toEqual(
		expect.objectContaining({
			info: expect.anything()
		})
	);
});
