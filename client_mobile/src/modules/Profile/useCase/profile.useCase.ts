import { UserModel } from "modules/UserModule/domain/user.model";
import { ProfileModel } from "../domain/profile.model";
import { requestProfile } from "../data/profile.request";

export class ProfileUseCase{
	constructor(
		public readonly profileModel:ProfileModel,
		public readonly userModel:UserModel
	){}

	getProfile(){
		if(this.userModel.guestUser && this.userModel.guestUser.phone){
			this.profileModel.actionProfile(this.userModel.guestUser.id)
		}else{
			this.profileModel.actionLogoutProfile()
		}
	}

	async deliveryAdressUpdate(bodyadress:any){
		try {
			if(this.profileModel.profile && this.userModel.guestUser){
				const {data} = await requestProfile.deliveryAdress({
					userid:this.userModel.guestUser.id,
					...bodyadress
				})
				this.getProfile()
			}
			
		} catch (error) {
			console.log(error);
		}
	}

	async deliveryAdressDelite(bodyadress:any){
		try {
			
			if(this.profileModel.profile && this.userModel.guestUser){
				const {data} = await requestProfile.delDeliveryAdress({
					userid:this.userModel.guestUser.id,
					...bodyadress
				})
				this.getProfile()
			}
			
		} catch (error) {
			console.log(error);
		}
	}


	async logoutUser(){
		await	this.userModel.actionLogoutUser()
		this.profileModel.actionLogoutProfile()
	}

	async userOrderList(){
		if(this.profileModel.profile && this.userModel.guestUser){
			return this.profileModel.repositoryGetUserOrders(this.userModel.guestUser.id)
		}
		
	}

	

}