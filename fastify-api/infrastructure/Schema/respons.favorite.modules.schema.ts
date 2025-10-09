const moduleSchema = {
	type: 'object',
	properties: {
		_id: { type: 'string' },
		name: { type: 'string' }
	},
	required: ['_id', 'name']
} as const;

const getFavoriteModulesJsonSchema = {
	type: 'array',
	items: moduleSchema
} as const;

export default getFavoriteModulesJsonSchema;
