import { UserModel } from '../domain/user.model';
import { ILoginUser } from '../interfaces/user.type';

export class UserUseCase {
  constructor(public readonly userModel: UserModel) {}

  async checkUserGuest() {
    if (this.userModel.guestUser) {
      this.userModel.actionCheckGusetUser(this.userModel.guestUser);
    } else {
      this.userModel.actionCreateGusetUser();
    }
  }

  async authUser(phone: string, code: string, password: string) {
    if (this.userModel.guestUser) {
      const successCode = await this.userModel.actionAuthUser({
        ...this.userModel.guestUser,
        phone,
        code,
        password,
      });
      return successCode;
    } else {
      return null;
    }
  }

  async loginUser(bodylogin: ILoginUser) {
    return await this.userModel.actionLoginUser(bodylogin);
  }

  checkAuthUser() {
    return this.userModel.guestUser && this.userModel.guestUser.phone;
  }
}
