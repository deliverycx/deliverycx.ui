import { UserModel } from "../domain/user.model";

export class UserUseCase {
	constructor(
		public readonly userModel: UserModel
	) { }

	async checkUserGuest() {
		if (this.userModel.guestUser) {
			this.userModel.actionCheckGusetUser(this.userModel.guestUser)
		} else {
			this.userModel.actionCreateGusetUser()
		}
	}

	async authUser(phone:string,code:string){
		if(this.userModel.guestUser){
			const successCode = await this.userModel.actionAuthUser({
				...this.userModel.guestUser,
				phone,
				code
			})
			return successCode
		}else{
			return null
		}
		
	}
}