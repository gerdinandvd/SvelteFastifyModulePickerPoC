import { vi, expect, beforeEach, it } from 'vitest';
import {
	GetAllModules,
	SearchForModules,
	GetAllFavoriteModules,
	GetDetailsOfModule,
	PostModuleIsFavored
} from '../../services/ModulesService.ts';

vi.mock('../../mongoose.ts', () => ({
	ModuleModel: {
		find: vi.fn(),
		findById: vi.fn()
	},
	UserModel: {
		exists: vi.fn(),
		findById: vi.fn(),
		updateOne: vi.fn()
	}
}));

import { ModuleModel, UserModel } from '../../mongoose.ts';
import { Types } from 'mongoose';
import { populate } from 'dotenv';

const multipleModules = [
	{
		level: 'test',
		_id: 'test',
		name: 'test',
		basic_description: 'test',
		credits: 0
	},
	{
		level: 'test',
		_id: 'test',
		name: 'test',
		basic_description: 'test',
		credits: 0
	}
];

const oneModule = {
	name: 'test',
	basic_description: 'test',
	type: 'test',
	level: 'test',
	theme: 'test',
	credits: 30,
	detailed_description: 'test'
};

const user_id = new Types.ObjectId();
const module_id = new Types.ObjectId();

beforeEach(() => {
	vi.resetAllMocks();
});

it('should return all modules without a limit', async () => {
	const chain = {
		select: vi.fn().mockReturnThis(),
		limit: vi.fn().mockReturnThis(),
		lean: vi.fn().mockResolvedValue(multipleModules)
	};
	(ModuleModel.find as any).mockReturnValue(chain);

	await GetAllModules();

	expect(chain.select).toHaveBeenCalledWith('_id name basic_description level credits');
	expect(chain.limit).not.toHaveBeenCalled();
	expect(chain.lean).toHaveBeenCalled();
});

it('should return all modules within a limit', async () => {
	const chain = {
		select: vi.fn().mockReturnThis(),
		limit: vi.fn().mockReturnThis(),
		lean: vi.fn().mockResolvedValue(multipleModules)
	};
	(ModuleModel.find as any).mockReturnValue(chain);

	await GetAllModules(1);

	expect(chain.select).toHaveBeenCalledWith('_id name basic_description level credits');
	expect(chain.limit).toHaveBeenCalled();
	expect(chain.lean).toHaveBeenCalled();
});

it('should return all modules with a text without a limit', async () => {
	const chain = {
		limit: vi.fn().mockReturnThis(),
		lean: vi.fn().mockResolvedValue(multipleModules)
	};
	(ModuleModel.find as any).mockReturnValue(chain);

	const searchString = 'AI';

	const search = {
		$text: { $search: searchString }
	};

	await SearchForModules(searchString);

	expect(ModuleModel.find).toHaveBeenCalledWith(search);
	expect(chain.limit).not.toHaveBeenCalled();
	expect(chain.lean).toHaveBeenCalled();
});

it('should return all modules with a text within a limit', async () => {
	const chain = {
		limit: vi.fn().mockReturnThis(),
		lean: vi.fn().mockResolvedValue(multipleModules)
	};
	(ModuleModel.find as any).mockReturnValue(chain);

	const searchString = 'AI';

	const search = {
		$text: { $search: searchString }
	};

	await SearchForModules(searchString, 1);

	expect(ModuleModel.find).toHaveBeenCalledWith(search);
	expect(chain.limit).toHaveBeenCalled();
	expect(chain.lean).toHaveBeenCalled();
});

it('should return all details of a module', async () => {
	const chain = {
		select: vi.fn().mockReturnThis(),
		lean: vi.fn().mockResolvedValue(oneModule)
	};
	(ModuleModel.findById as any).mockReturnValue(chain);

	const user_model_exists_call = {
		_id: user_id,
		ids_favorite_modules: module_id
	};

	const result = await GetDetailsOfModule(module_id, user_id);

	expect(chain.select).toHaveBeenCalledWith(
		'name basic_description type level theme credits detailed_description'
	);
	expect(ModuleModel.findById).toHaveBeenCalledWith(module_id);
	expect(UserModel.exists).toHaveBeenCalledWith(user_model_exists_call);
	expect(chain.lean).toHaveBeenCalled();
});

it('should return undefined when module is not found', async () => {
	const chain = {
		select: vi.fn().mockReturnThis(),
		lean: vi.fn().mockResolvedValue(null)
	};
	(ModuleModel.findById as any).mockReturnValue(chain);

	const user_model_exists_call = {
		_id: user_id,
		ids_favorite_modules: module_id
	};

	const result = await GetDetailsOfModule(module_id, user_id);

	expect(result).toEqual(undefined);
});

it('should return all favorite modules', async () => {
	const chain = {
		populate: vi.fn().mockReturnThis(),
		lean: vi.fn().mockResolvedValue(multipleModules)
	};
	(UserModel.findById as any).mockReturnValue(chain);

	const populate_call = {
		path: 'ids_favorite_modules',
		select: '_id name'
	};
	await GetAllFavoriteModules(user_id);

	expect(UserModel.findById).toHaveBeenCalledWith(user_id);
	expect(chain.populate).toHaveBeenCalledWith(populate_call);
	expect(chain.lean).toHaveBeenCalled();
});

it('should return an error when asking for favorite modules, the user does not exist', async () => {
	const chain = {
		populate: vi.fn().mockReturnThis(),
		lean: vi.fn().mockResolvedValue(null)
	};
	(UserModel.findById as any).mockReturnValue(chain);

	const populate_call = {
		path: 'ids_favorite_modules',
		select: '_id name'
	};
	await expect(GetAllFavoriteModules(user_id)).rejects.toThrow('User not found');
});

it('should mark the module as favored when asked so', async () => {
	const return_object = {
		acknowledged: true
	};
	(UserModel.updateOne as any).mockResolvedValue(return_object);

	const result = await PostModuleIsFavored(module_id, user_id, true);

	const updateOneCall1 = { _id: user_id };
	const updateOneCall2 = {
		$addToSet: { ids_favorite_modules: module_id }
	};

	expect(UserModel.updateOne).toHaveBeenCalledWith(updateOneCall1, updateOneCall2);
	expect(result).toEqual(true);
});

it('should mark the module as favored when asked so', async () => {
	const return_object = {
		acknowledged: true
	};
	(UserModel.updateOne as any).mockResolvedValue(return_object);

	const result = await PostModuleIsFavored(module_id, user_id, false);

	const updateOneCall1 = { _id: user_id };
	const updateOneCall2 = {
		$pull: { ids_favorite_modules: module_id }
	};

	expect(UserModel.updateOne).toHaveBeenCalledWith(updateOneCall1, updateOneCall2);
	expect(result).toEqual(true);
});
