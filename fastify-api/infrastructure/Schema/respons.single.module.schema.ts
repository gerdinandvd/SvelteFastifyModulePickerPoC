const ModuleJsonSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		basic_description: { type: 'string' },
		detailed_description: { type: 'string' },
		type: { type: 'string' },
		level: { type: 'string' },
		theme: { type: 'string' },
		credits: { type: 'number' },
		favored: { type: 'boolean' }
	},
	required: ['name', 'basic_description', 'type', 'level', 'theme', 'credits', 'favored']
} as const;

export default ModuleJsonSchema;
