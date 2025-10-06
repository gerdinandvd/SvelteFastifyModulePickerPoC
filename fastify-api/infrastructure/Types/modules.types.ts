import type { FromSchema } from 'json-schema-to-ts';
import loginJsonSchema from '../Schema/login.schema.ts';
import responseJsonSchema from '../Schema/respons.schema.ts';
import getModulesResponseJsonSchema from '../Schema/respons.multiple.module.schema.ts';
import ModuleJsonSchema from '../Schema/respons.single.module.schema.ts';

// Type voor de POST /login request body
export type PostBody = FromSchema<typeof loginJsonSchema>;

// Type voor de POST /login response
export type PostResponse = FromSchema<typeof responseJsonSchema>;

export type GetModulesResponse = FromSchema<typeof getModulesResponseJsonSchema>;

export type GetModuleResponse = FromSchema<typeof ModuleJsonSchema>;
