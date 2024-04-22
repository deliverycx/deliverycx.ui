import { IAccessGuard } from "application/guards/aplication.guard";
import { IUserGuest } from "./user.type";

export class UserGuards implements IAccessGuard<IUserGuest>{
	existing(user:IUserGuest){
		return !!(user && user.id && typeof user.username === 'string')
		
	}
}