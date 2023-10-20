import { IRequestProfile } from "../interfaces/profile.type";

export class ProfileEntity{
	existingProrfile(profile:IRequestProfile){
		if(profile){
			return profile
		}else{
			return false
		}
	}



}