import { model } from 'mongoose';

import type { IUser } from '../../domain/interfaces/IUser.ts';
import type { IModule } from '../../domain/interfaces/IModule.ts';

import UserSchema from './UserModel.ts';
import ModuleSchema from './ModuleModel.ts';

const UserModel = model<IUser>('User', UserSchema);
const ModuleModel = model<IModule>('Module', ModuleSchema);

export { UserModel, ModuleModel };
