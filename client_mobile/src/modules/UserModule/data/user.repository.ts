import { IUserGuest } from "../interfaces/user.type";
import { requestUser } from "./user.request";

export class UserRepository{

	async repositoryCreateGuest(){
		try {
			const {data} = await requestUser.register()
			if(data){
				return data
			}
		} catch (error) {
			console.log(error);
		}
	}

	async repositoryCheckGuest(user:IUserGuest){
		try {
			const {data} = await requestUser.check(user)
			return data
		} catch (error) {
			console.log(error);
		}
	}
}