import { action, makeObservable, observable } from "mobx";
import { UserRepository } from "../data/user.repository";
import { makePersistable } from "mobx-persist-store";
import { IUserGuest } from "../interfaces/user.type";

export class UserModel extends UserRepository{
	guestUser:IUserGuest | null = null

	constructor() {
		super()
		makeObservable(this, {
			guestUser:observable,
			actionCreateGusetUser:action,
			actionCheckGusetUser:action
		})
		makePersistable(this, { name: 'user', properties: ['guestUser'],storage: window.localStorage });
	}

	async actionCreateGusetUser(){
		try {
			const result = await this.repositoryCreateGuest()
			if(result){
				this.guestUser = result
			}else{
				this.guestUser = null
			}
			
			
		} catch (error) {
			console.log(error);
			this.guestUser = null
		}
	}

	async actionCheckGusetUser(user:IUserGuest){
		try {
			const result = await this.repositoryCheckGuest(user)
			if(result){
				this.guestUser = result
			}else{
				this.guestUser = null
			}
			
			
		} catch (error) {
			console.log(error);
			this.guestUser = null
		}
	}
}