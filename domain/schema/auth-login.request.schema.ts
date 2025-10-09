const LoginRequestSchema = {
	type: 'object',
	required: ['username', 'password'],
	properties: {
		username: { type: 'string' },
		password: { type: 'string' }
	}
} as const;

export default LoginRequestSchema;
