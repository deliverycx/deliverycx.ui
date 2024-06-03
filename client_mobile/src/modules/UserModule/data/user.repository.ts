import { guardRepository } from 'application/guards/repository.guard';
import * as userType from '../interfaces/user.type';
import { requestUser } from './user.request';
import { userMapper } from '../interfaces/user.dto';
import { UserGuards } from '../interfaces/user.guard';
import { AccessGuard, DTOMapper } from 'application/guards/aplication.guard';

export class UserRepository extends UserGuards {
  async repositoryCreateGuest() {
    try {
      const { data } = await requestUser.register();
      const result = guardRepository(this.existing)(data);
      if (result) {
        return userMapper(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //@DTOMapper(userMapper)
  //@AccessGuard(UserGuards)
  async repositoryCheckGuest(user: userType.IUser) {
    try {
      const { data } = await requestUser.check(user);

      const result = guardRepository(this.existing)(data);
      if (result) {
        return userMapper(data);
      }
    } catch (error) {
      console.log(error);
      this.repositoryCreateGuest();
    }
  }

  async repositoryAuthUser(body: userType.IUpdateData) {
    try {
      const { data } = await requestUser.update(body);
      const result = guardRepository(this.existing)(data);

      if (result) {
        return userMapper(result as unknown as userType.IUserGuest);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async repositoryLoginUser(body: userType.ILoginUser) {
    try {
      const { data } = await requestUser.loginUser(body);
      const result = guardRepository(this.existing)(data);

      if (result) {
        return userMapper(result as unknown as userType.IUserGuest);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
