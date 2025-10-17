import mongoose from 'mongoose';

//import { ModuleModel, UserModel } from '../infrastructure/MongooseSchemas/index.ts';

const clientOptions = {
	serverApi: { version: '1' as const, strict: false, deprecationErrors: true, autoIndex: true }
};

import { model } from 'mongoose';

import type { IUser } from '../domain/interfaces/IUser.ts';
import type { IModule } from '../domain/interfaces/IModule.ts';

import UserSchema from '../infrastructure/MongooseSchemas/UserSchema.ts';
import ModuleSchema from '../infrastructure/MongooseSchemas/ModuleSchema.ts';

export const UserModel = model<IUser>('User', UserSchema);
export const ModuleModel = model<IModule>('Module', ModuleSchema);

// Functie om te verbinden
export async function connectDB(uri: string) {
	try {
		await mongoose.connect(uri, clientOptions);
		UserModel.syncIndexes();
		ModuleModel.syncIndexes();
		console.log('Connected to MongoDB!');
	} catch (err) {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	}
}

// Optioneel: de mongoose instance exporteren
//export default mongoose;
