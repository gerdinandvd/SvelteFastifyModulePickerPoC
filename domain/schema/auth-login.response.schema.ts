const LoginResponseSchema = {
	type: 'object',
	required: ['accessToken'],
	properties: {
		accessToken: { type: 'string' }
	}
} as const;

export default LoginResponseSchema;
