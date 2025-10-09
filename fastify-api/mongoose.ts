import mongoose from 'mongoose';

import { ModuleModel, UserModel } from '../infrastructure/MongooseSchemas/index.ts';

const clientOptions = {
	serverApi: { version: '1' as const, strict: false, deprecationErrors: true, autoIndex: true }
};

// Functie om te verbinden
export async function connectDB(uri: string) {
	try {
		await mongoose.connect(uri, clientOptions);
		console.log('Connected to MongoDB!');
		await ModuleModel.init();
		await UserModel.init();
	} catch (err) {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	}
}

// Optioneel: de mongoose instance exporteren
export default mongoose;
