const responseJsonSchema = {
  type: 'object',
  required: ['message', 'success'],
  properties: {
    message: { type: 'string' },
    success: { type: 'boolean' }
  }
} as const;

//type PostResponse = FromSchema<typeof responseJsonSchema>;


export default responseJsonSchema