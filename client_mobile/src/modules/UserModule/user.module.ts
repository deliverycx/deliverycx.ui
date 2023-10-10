import { UserModel } from "./domain/user.model";
import { UserUseCase } from "./useCase/user.useCase";


export const userModel = new UserModel()

export const userUseCase = new UserUseCase(userModel)