const ModuleListItemSchema = {
	type: 'object',
	properties: {
		_id: { type: 'string' },
		name: { type: 'string' },
		basic_description: { type: 'string' },
		level: { type: 'string' },
		credits: { type: 'string' }
	},
	required: ['_id', 'name', 'basic_description', 'level', 'credits']
} as const;

const ModulesListResponseSchema = {
	type: 'array',
	items: ModuleListItemSchema
} as const;

export default ModulesListResponseSchema;
