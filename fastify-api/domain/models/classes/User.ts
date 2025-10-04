import IUser from '../interfaces/IUser';

class User implements IUser {
	constructor(
		public name: string,
		public hashed_password: string,
		public ids_favorite_modules?: string[]
	) {}
}

export default User;
