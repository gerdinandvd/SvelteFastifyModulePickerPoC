const FavoriteModuleSchema = {
	type: 'object',
	properties: {
		_id: { type: 'string' },
		name: { type: 'string' }
	},
	required: ['_id', 'name']
} as const;

const FavoriteModulesResponseSchema = {
	type: 'array',
	items: FavoriteModuleSchema
} as const;

export default FavoriteModulesResponseSchema;
