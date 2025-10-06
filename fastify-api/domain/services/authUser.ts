import { compare } from 'bcrypt-ts';
import { UserModel } from '../models/MongooseSchemas/index.ts';

export async function Login(username: string, password: string): Promise<boolean> {
	console.log(username, password);

	const user = await UserModel.findOne({ username: username });
	console.log(user);

	if (!user) {
		console.log('Gebruiker bestaat niet');
		return false;
	}

	const match = await compare(password, user.hashed_password);
	console.log(match);
	return match;
}
