import { ROUTE_APP } from "application/contstans/route.const"
import { shemaProfilePersonal } from "application/helpers/validationSchema"
import { useFormik } from "formik"
import { requestProfile } from "modules/Profile/data/profile.request"
import { profileModel, profileUseCase } from "modules/Profile/profile.module"
import { userModel } from "modules/UserModule/user.module"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function useProfilePersonalViewModel(this:any) {
	const navigate = useNavigate()
	const [error,setError] = useState(false)
	const {profile} = profileModel
	const user = userModel.guestUser


	const initialValues = {
		name:'',
		lastname:'',
		birthday:'',
		male:'man',
		phone:'',
		email:'',
		spam:false
	}

	const formik = useFormik({
		initialValues,
		validationSchema: shemaProfilePersonal(),
		onSubmit: async (values, meta) => {
			try {
				await requestProfile.personal({...values,userid:user?.id})
				navigate(ROUTE_APP.PROFILE.PROFILE_MAIN)
			} catch (error) {
				console.log(error);
				setError(true)
			}

		},
	});


	useEffect(()=>{
		if(user && user.phone){
			profileUseCase.getProfile()
		}else{
			navigate(ROUTE_APP.AUTH.REGISTER)
		}
	},[user])

	useEffect(()=>{
		if(profile && profile.personal){
			formik.setValues(profile.personal)
		}
	},[profile])

	
	
	this.data({
		profile,
		formik,
		error
	});
	this.handlers({
		
	});
	this.status({
		
	});
}