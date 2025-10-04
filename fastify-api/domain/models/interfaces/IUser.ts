interface IUser {
	name: string;
	hashed_password: string;
	ids_favorite_modules?: string[];
}

export default IUser;
