import { makeObservable, observable, action } from "mobx";
import { ProfileRepository } from "../data/profile.repository";
import { IProfile } from "../interfaces/profile.type";
import { makePersistable } from "mobx-persist-store";

export class ProfileModel extends ProfileRepository{
	profile:IProfile | null = null

	constructor() {
		super()
		makeObservable(this, {
			profile:observable,
			actionProfile:action,
		})
		makePersistable(this, { name: 'profile', properties: ['profile'],storage: window.localStorage });
	}

	async actionProfile(userid:string){
		const resProfile = await this.repositoryGetProfile(userid)
		if(resProfile){
			this.profile = resProfile
		}
	}
}