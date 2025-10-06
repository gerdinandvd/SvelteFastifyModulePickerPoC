// src/Schema/modules.schema.ts
const moduleSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		basic_description: { type: 'string' },
		level: { type: 'string' },
		credits: { type: 'number' }
	},
	required: ['name', 'basic_description', 'level', 'credits']
} as const;

const getModulesResponseJsonSchema = {
	type: 'array',
	items: moduleSchema
} as const;

export default getModulesResponseJsonSchema;
