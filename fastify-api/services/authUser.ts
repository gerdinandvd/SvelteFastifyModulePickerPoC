import { compare } from 'bcrypt-ts';
import { UserModel } from '../../infrastructure/MongooseSchemas/index.ts';
import { Types } from 'mongoose';

type ResponseData = {
	success: boolean;
	user_id: Types.ObjectId;
};

export async function Login(username: string, password: string): Promise<ResponseData> {
	console.log(username, password);

	const user = await UserModel.findOne({ username: username });
	console.log(user);

	if (!user) return { success: false, user_id: new Types.ObjectId() };

	return { success: await compare(password, user.hashed_password), user_id: user._id };
}
