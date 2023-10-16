import { guardRepository } from "application/guards/repository.guard";
import { requestProfile } from "./profile.request";
import { ProfileEntity } from "../domain/profile.entity";
import { profileMapper } from "../interfaces/profile.dto";
import { IRequestProfile } from "../interfaces/profile.type";

export class ProfileRepository extends ProfileEntity{
	async repositoryGetProfile(userid:string){
		try {
			const {data} = await requestProfile.getProfile(userid)
			const result = guardRepository(this.existingProrfile)(data)
			if(result){
				return profileMapper(result as IRequestProfile)
			}
		} catch (error) {
			console.log(error);
		}
	}
}