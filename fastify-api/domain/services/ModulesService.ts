import { ModuleModel, UserModel } from '../models/MongooseSchemas/index.ts';
import type {
	GetModulesResponse,
	GetModuleResponse
} from '../../infrastructure/Types/modules.types';
import mongoose from 'mongoose';
import { Types } from 'mongoose';

// type _id = {
// 	_id: string;
// };

export async function GetAllModules(max_amount?: number): Promise<GetModulesResponse> {
	if (typeof max_amount == 'undefined') {
		return await ModuleModel.find().select('name basic_description  level  credits').lean();
	}

	return await ModuleModel.find()
		.select('name basic_description level  credits')
		.limit(max_amount)
		.lean();
}

export async function SearchForModules(
	searchString: string,
	max_amount?: number
): Promise<GetModulesResponse> {
	if (typeof max_amount == 'undefined') {
		return await ModuleModel.find({
			$text: { $search: searchString }
		}).lean();
	}

	return await ModuleModel.find({
		$text: { $search: searchString }
	})
		.limit(max_amount)
		.lean();
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
