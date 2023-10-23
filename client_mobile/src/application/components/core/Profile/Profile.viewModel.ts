import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { userModel } from "modules/UserModule/user.module";
import { ROUTE_APP } from 'application/contstans/route.const';
import { profileModel, profileUseCase } from "modules/Profile/profile.module";

export function useProfileViewModel(this:any) {
	const navigate = useNavigate()
	const user = userModel.guestUser
	const profile = profileModel.profile

	useEffect(()=>{
		if(user && user.phone){
			profileUseCase.getProfile()
		}else{
			navigate(ROUTE_APP.AUTH.REGISTER)
		}
	},[user])

	const logout = async () =>{
		await profileUseCase.logoutUser()
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