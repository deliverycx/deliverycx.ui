import { makeObservable, observable, action } from "mobx";
import { ProfileRepository } from "../data/profile.repository";
import { IProfile } from "../interfaces/profile.type";

export class ProfileModel extends ProfileRepository{
	profile:IProfile | null = null

	constructor() {
		super()
		makeObservable(this, {
			profile:observable,
			actionProfile:action,
		})
		
	}

	async actionProfile(userid:string){
		const resProfile = await this.repositoryGetProfile(userid)
		if(resProfile){
			this.profile = resProfile
		}
	}
}