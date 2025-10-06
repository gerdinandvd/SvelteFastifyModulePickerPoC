import type { RouteGenericInterface } from 'fastify';
import type {
	GetModulesResponse,
	GetModuleResponse,
	PostBody,
	PostResponse
} from './modules.types';
import { ObjectId } from 'mongoose';

interface SearchQuery {
	module_request?: string;
}

interface Params {
	moduleId: string;
}

export interface LoginRoute extends RouteGenericInterface {
	Body: PostBody;
	Reply: PostResponse;
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

// nog uitbreiden met GetModuleResponse
