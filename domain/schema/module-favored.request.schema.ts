const ModuleFavoredRequestSchema = {
	type: 'object',
	required: ['is_favored'],
	properties: {
		is_favored: { type: 'boolean' }
	}
} as const;

export default ModuleFavoredRequestSchema;
