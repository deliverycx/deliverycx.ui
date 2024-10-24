import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { userModel } from "modules/UserModule/user.module";
import { ROUTE_APP } from 'application/contstans/route.const';
import { profileModel, profileUseCase } from "modules/Profile/profile.module";
import ym from 'react-yandex-metrika';
import { basketUseCase } from "modules/BasketModule/basket.module";

export function useProfileViewModel(this:any) {
	const navigate = useNavigate()
	const user = userModel.guestUser
	const profile = profileModel.profile

	useEffect(()=>{
		if(user && user.phone){
			profileUseCase.getProfile()
			//ym('reachGoal','autorization_success')
			basketUseCase.cartCase()
		}else{
			navigate(ROUTE_APP.AUTH.REGISTER)
		}
	},[user])

	const logout = async () =>{
		await profileUseCase.logoutUser()
		basketUseCase.cartCase()
		navigate(ROUTE_APP.AUTH.REGISTER)
	}

	
	this.data({
		profile,
		user
	});
	this.handlers({
		logout
	});
	this.status({
		
	});
}