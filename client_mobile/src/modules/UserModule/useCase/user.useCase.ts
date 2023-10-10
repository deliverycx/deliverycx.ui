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
}