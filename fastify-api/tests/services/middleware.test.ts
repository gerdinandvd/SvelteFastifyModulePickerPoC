import { vi, it, expect, beforeEach } from 'vitest';
import fp from '../../services/middleware/authenticate.ts';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastify from 'fastify';

let app: FastifyInstance;

beforeEach(async () => {
	app = fastify();
	vi.resetAllMocks();
});

it('calls jwtVerify successfully', async () => {
	const mockRequest = {
		jwtVerify: vi.fn().mockResolvedValue(undefined)
	} as unknown as FastifyRequest;
	const mockReply = { code: vi.fn().mockReturnThis(), send: vi.fn() } as unknown as FastifyReply;

	await fp(app);

	const authenticate = (app as any).authenticate;

	await authenticate(mockRequest, mockReply);

	expect(mockRequest.jwtVerify).toHaveBeenCalledTimes(1);
	expect(mockReply.code).not.toHaveBeenCalled();
	expect(mockReply.send).not.toHaveBeenCalled();
});

it('returns 401 when jwtVerify throws', async () => {
	const mockRequest = {
		jwtVerify: vi.fn().mockRejectedValue(new Error('invalid token'))
	} as unknown as FastifyRequest;
	const mockReply = { code: vi.fn().mockReturnThis(), send: vi.fn() } as unknown as FastifyReply;

	await fp(app);
	const authenticate = (app as any).authenticate;

	await authenticate(mockRequest, mockReply);

	expect(mockRequest.jwtVerify).toHaveBeenCalledTimes(1);
	expect(mockReply.code).toHaveBeenCalledWith(401);
	expect(mockReply.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
});
