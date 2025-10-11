import { Schema } from 'mongoose';
import type { IUser } from '../../domain/interfaces/IUser';

const UserSchema = new Schema<IUser>({
	username: { type: String, required: true },
	hashed_password: { type: String, required: true },
	ids_favorite_modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }]
});

export default UserSchema;
