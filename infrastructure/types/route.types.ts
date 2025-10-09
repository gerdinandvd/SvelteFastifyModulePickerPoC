import type { RouteGenericInterface } from 'fastify';
import type {
	GetModulesResponse,
	GetModuleResponse,
	PostLoginBody,
	PostLoginResponse,
	PostModuleIsFavoredBody,
	GenericResponse as ApiBaseResponse,
	GetFavoriteModulesResponse
} from './modules.types';

interface SearchModulesQuery {
	module_request?: string;
}

interface ModuleIdParams {
	moduleId: string;
}

// --- AUTH ROUTES ---

export interface PostLoginRoute extends RouteGenericInterface {
	Body: PostLoginBody;
	Reply: PostLoginResponse;
}

// --- MODULE ROUTES ---

export interface GetModulesRoute extends RouteGenericInterface {
	Reply: GetModulesResponse;
}

export interface GetSearchModulesRoute extends RouteGenericInterface {
	Reply: GetModulesResponse;
	Querystring: SearchModulesQuery;
}

export interface GetModuleRoute extends RouteGenericInterface {
	Params: ModuleIdParams;
	Reply: GetModuleResponse;
}

export interface PostModuleFavoritedRoute extends RouteGenericInterface {
	Params: ModuleIdParams;
	Body: PostModuleIsFavoredBody;
	Reply: ApiBaseResponse;
}

export interface GetFavoriteModulesRoute extends RouteGenericInterface {
	Reply: GetFavoriteModulesResponse;
}
