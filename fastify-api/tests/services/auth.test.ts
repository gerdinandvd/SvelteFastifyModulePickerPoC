import { vi, expect, beforeEach, it } from 'vitest';

const fakeUser = {
	_id: 'test',
	username: 'test',
	hashed_password: 'test',
	ids_favorite_modules: []
};

// Mock Mongoose models vóór import van Login
vi.mock('../../mongoose.ts', () => ({
	UserModel: {
		findOne: vi.fn()
	}
}));

vi.mock('bcrypt-ts', () => ({
	compare: vi.fn() // hier mock je de named export 'compare'
}));

import { UserModel } from '../../mongoose.ts';
import { Login } from '../../services/authUser.ts';
import { compare } from 'bcrypt-ts';
import { Types } from 'mongoose';

beforeEach(() => {
	vi.resetAllMocks();
});

it('should return the user_id when the credentials are valid', async () => {
	(UserModel.findOne as any).mockResolvedValue(fakeUser);

	(compare as any).mockResolvedValue(true);

	const result = await Login('username', 'password');

	expect(result).toEqual({ success: true, user_id: 'test' });
});

it('should false when the user does not exist', async () => {
	(UserModel.findOne as any).mockResolvedValue(null);

	(compare as any).mockResolvedValue(true);

	const result = await Login('username', 'password');

	expect(result).toEqual({ success: false, user_id: expect.anything() });
});
