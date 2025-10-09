import { ModuleModel, UserModel } from '../models/MongooseSchemas/index.ts';
import type {
	GetModulesResponse,
	GetModuleResponse,
	GetFavoriteModulesResponse
} from '../../infrastructure/Types/modules.types';
import mongoose from 'mongoose';
import { Types } from 'mongoose';

import type { UpdateWriteOpResult } from 'mongoose';

export async function GetAllModules(max_amount?: number): Promise<GetModulesResponse> {
	if (typeof max_amount == 'undefined') {
		const modules = await ModuleModel.find()
			.select('_id name basic_description level credits')
			.lean();

		const modulesForJson = modules.map((m) => ({
			...m,
			_id: m._id.toString()
		}));

		return modulesForJson;
	}

	const modules = await ModuleModel.find()
		.select('_id name basic_description level credits')
		.limit(max_amount)
		.lean();

	const modulesForJson = modules.map((m) => ({
		...m,
		_id: m._id.toString()
	}));

	return modulesForJson;
}

export async function SearchForModules(
	searchString: string,
	max_amount?: number
): Promise<GetModulesResponse> {
	if (typeof max_amount == 'undefined') {
		const modules = await ModuleModel.find({
			$text: { $search: searchString }
		}).lean();

		const modulesForJson = modules.map((m) => ({
			...m,
			_id: m._id.toString()
		}));

		return modulesForJson;
	}

	const modules = await ModuleModel.find({
		$text: { $search: searchString }
	})
		.limit(max_amount)
		.lean();

	const modulesForJson = modules.map((m) => ({
		...m,
		_id: m._id.toString()
	}));

	return modulesForJson;
}

export async function GetDetailsOfModule(
	module_id: Types.ObjectId,
	user_id: Types.ObjectId
): Promise<GetModuleResponse | undefined> {
	const module = await ModuleModel.findById(module_id)
		.select('name basic_description type level theme credits detailed_description')
		.lean();

	if (!module) return undefined;

	const favored = !!(await UserModel.exists({
		_id: user_id,
		ids_favorite_modules: module_id
	}));

	return {
		...module,
		favored
	};
}

export async function GetAllFavoriteModules(
	user_id: Types.ObjectId
): Promise<GetFavoriteModulesResponse> {
	const user = await UserModel.findById(user_id)
		.populate<{ ids_favorite_modules: { _id: string; name: string }[] }>({
			path: 'ids_favorite_modules',
			select: '_id name'
		})
		.lean();

	if (!user) throw new Error('User not found');

	return user.ids_favorite_modules;
}

export async function PostModuleIsFavored(
	module_id: Types.ObjectId,
	user_id: Types.ObjectId,
	is_favored: boolean
): Promise<boolean> {
	let result: UpdateWriteOpResult;
	if (is_favored) {
		result = await UserModel.updateOne(
			{ _id: user_id },
			{ $addToSet: { ids_favorite_modules: module_id } }
		);
	} else {
		result = await UserModel.updateOne(
			{ _id: user_id },
			{ $pull: { ids_favorite_modules: module_id } }
		);
	}

	return result.acknowledged;
}
