import { IUserGuest } from "../interfaces/user.type";

export class UserEntity{
	existingUser(user:IUserGuest){
		if(user && user.id && typeof user.username === 'string'){
			return user
		}else{
			return false
		}
		
	}
}