import { action, makeObservable, observable } from "mobx";
import { UserRepository } from "../data/user.repository";
import { makePersistable } from "mobx-persist-store";
import { IUpdateData, IUser, IUserGuest } from "../interfaces/user.type";

export class UserModel extends UserRepository{
	guestUser:IUser | null = null

	constructor() {
		super()
		makeObservable(this, {
			guestUser:observable,
			actionCreateGusetUser:action,
			actionCheckGusetUser:action,
			actionAuthUser:action,
			actionLogoutUser:action
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

	async actionCheckGusetUser(user:IUser){
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

	async actionAuthUser(body:IUpdateData){
		const user = await this.repositoryAuthUser(body)
		if(user){
			this.guestUser = user
			return user
		}
	}

	async actionLogoutUser(){
		this.guestUser = null
		await this.actionCreateGusetUser()
	}
}