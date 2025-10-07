const responseJsonSchema = {
	type: 'object',
	required: ['message', 'success'],
	properties: {
		message: { type: 'string' },
		success: { type: 'boolean' }
	}
} as const;

export default responseJsonSchema;
