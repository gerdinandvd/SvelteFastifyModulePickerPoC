import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { ModuleModel, UserModel } from './domain/models/MongooseSchemas/index.ts';

dotenv.config();

const uri = process.env.MONGODB_URL!;
const clientOptions = {
	serverApi: { version: '1' as const, strict: false, deprecationErrors: true, autoIndex: true }
};

// Functie om te verbinden
export async function connectDB() {
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
