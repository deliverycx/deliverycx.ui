import { UserModel } from "modules/UserModule/domain/user.model";
import { ProfileModel } from "../domain/profile.model";

export class ProfileUseCase{
	constructor(
		public readonly profileModel:ProfileModel,
		public readonly userModel:UserModel
	){}

	getProfile(){
		if(this.userModel.guestUser){
			this.profileModel.actionProfile(this.userModel.guestUser.id)
		}
	}
}