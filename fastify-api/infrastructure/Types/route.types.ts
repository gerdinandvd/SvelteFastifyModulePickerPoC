import type { RouteGenericInterface } from 'fastify';
import type {
	GetModulesResponse,
	GetModuleResponse,
	PostLoginBody,
	PostLoginResponse,
	PostModuleIsFavoredBody,
	DefaultResponse,
	GetFavoriteModulesResponse
} from './modules.types';
import { ObjectId } from 'mongoose';

interface SearchQuery {
	module_request?: string;
}

interface Params {
	moduleId: string;
}

export interface LoginRoute extends RouteGenericInterface {
	Body: PostLoginBody;
	Reply: PostLoginResponse;
}

export interface GetModulesRoute extends RouteGenericInterface {
	Reply: GetModulesResponse;
}

export interface GetSearchModulesRoutes extends RouteGenericInterface {
	Reply: GetModulesResponse;
	Querystring: SearchQuery;
}

export interface GetModuleDetailsRoute extends RouteGenericInterface {
	Params: Params;
	Reply: GetModuleResponse;
}

export interface PostModuleIsFavoredRoute extends RouteGenericInterface {
	Params: Params;
	Body: PostModuleIsFavoredBody;
	Reply: DefaultResponse;
}

export interface GetFavoriteModulesRoute extends RouteGenericInterface {
	Reply: GetFavoriteModulesResponse;
}
