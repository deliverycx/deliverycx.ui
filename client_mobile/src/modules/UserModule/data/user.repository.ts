import { guardRepository } from "application/guards/repository.guard";
import { IUpdateData, IUser, IUserGuest } from "../interfaces/user.type";
import { requestUser } from "./user.request";
import { UserEntity } from "../domain/user.entity";
import { userMapper } from "../interfaces/user.dto";

export class UserRepository extends UserEntity{

	async repositoryCreateGuest(){
		try {
			const {data} = await requestUser.register()
			const result = guardRepository(this.existingUser)(data)
			if(result){
				return userMapper(result as unknown as IUserGuest)
			}
		} catch (error) {
			console.log(error);
		}
	}

	async repositoryCheckGuest(user:IUser){
		try {
			const {data} = await requestUser.check(user)
			const result = guardRepository(this.existingUser)(data)
			if(result){
				return userMapper(result as unknown as IUserGuest)
			}
		} catch (error) {
			console.log(error);
		}
	}

	async repositoryAuthUser(body:IUpdateData){
		try {
			const {data} = await requestUser.update(body)
			const result = guardRepository(this.existingUser)(data)
			if(result){
				return userMapper(result as unknown as IUserGuest)
			}
		} catch (error) {
			console.log(error);
		}
	}
}