import type { FromSchema } from 'json-schema-to-ts';

import {
	LoginRequestSchema,
	LoginResponseSchema,
	ModulesListResponseSchema,
	ModuleResponseSchema,
	ModuleFavoredRequestSchema,
	ApiResponseSchema,
	FavoriteModulesResponseSchema
} from '../../domain/schema';

// -------------------- AUTH --------------------
export type PostLoginBody = FromSchema<typeof LoginRequestSchema>;
export type PostLoginResponse = FromSchema<typeof LoginResponseSchema>;

// -------------------- MODULES --------------------
export type GetModulesResponse = FromSchema<typeof ModulesListResponseSchema>;
export type GetModuleResponse = FromSchema<typeof ModuleResponseSchema>;
export type GetFavoriteModulesResponse = FromSchema<typeof FavoriteModulesResponseSchema>;
export type PostModuleIsFavoredBody = FromSchema<typeof ModuleFavoredRequestSchema>;

// -------------------- GENERIC --------------------
export type GenericResponse = FromSchema<typeof ApiResponseSchema>;
