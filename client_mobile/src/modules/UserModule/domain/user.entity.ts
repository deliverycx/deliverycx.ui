import { IUserGuest } from "../interfaces/user.type";

export class UserEntity{
	existingUser(user:IUserGuest){
		console.log(user);
		if(user && user.id && typeof user.username === 'string'){
			return user
		}else{
			return false
		}
		
	}
}