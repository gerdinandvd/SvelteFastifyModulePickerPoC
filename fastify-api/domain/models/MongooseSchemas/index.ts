import { model } from 'mongoose';

import type { IUser } from '../interfaces/IUser';
import type { IModule } from '../interfaces/IModule';

import UserSchema from './UserModel.ts';
import ModuleSchema from './ModuleModel.ts';

const UserModel = model<IUser>('User', UserSchema);
const ModuleModel = model<IModule>('Module', ModuleSchema);

export { UserModel, ModuleModel };
