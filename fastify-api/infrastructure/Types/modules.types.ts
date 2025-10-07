import type { FromSchema } from 'json-schema-to-ts';
import loginJsonSchema from '../Schema/login.schema';
import responseLoginJsonSchema from '../Schema/respons.login.schema';
import getModulesResponseJsonSchema from '../Schema/respons.multiple.module.schema';
import ModuleJsonSchema from '../Schema/respons.single.module.schema';
import moduleFavoredJsonSchema from '../Schema/favored.module.schema';
import responseJsonSchema from '../Schema/respons.schema';

// Type voor de POST /login request body
export type PostLoginBody = FromSchema<typeof loginJsonSchema>;

// Type voor de POST /login response
export type PostLoginResponse = FromSchema<typeof responseLoginJsonSchema>;

export type GetModulesResponse = FromSchema<typeof getModulesResponseJsonSchema>;

export type GetModuleResponse = FromSchema<typeof ModuleJsonSchema>;

export type PostModuleIsFavoredBody = FromSchema<typeof moduleFavoredJsonSchema>;

export type DefaultResponse = FromSchema<typeof responseJsonSchema>;
