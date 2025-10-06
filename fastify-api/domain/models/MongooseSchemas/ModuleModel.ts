import { Schema } from 'mongoose';
import type { IModule } from '../interfaces/IModule';

const ModuleSchema = new Schema<IModule>({
	name: { type: String, required: true },
	basic_description: { type: String, required: true },
	detailed_description: { type: String },
	type: { type: String, required: true },
	level: { type: String, required: true },
	theme: { type: String, required: true },
	credits: { type: Number, required: true },
	keywords: [{ type: String }]
});

ModuleSchema.index(
	{
		name: 'text',
		type: 'text',
		level: 'text',
		theme: 'text',
		keywords: 'text'
	},
	{ default_language: 'dutch' }
);

export default ModuleSchema;
