import { userModel } from 'modules/UserModule/user.module';
import { ProfileModel } from './domain/profile.model';
import { ProfileUseCase } from './useCase/profile.useCase';

export const profileModel = new ProfileModel();

export const profileUseCase = new ProfileUseCase(profileModel, userModel);
