import { valid } from "application/helpers/validationSchema";
import { useFormik } from "formik";
import { requestUser } from "modules/UserModule/data/user.request";
import { userUseCase } from "modules/UserModule/user.module";
import { useState } from 'react';
import * as yup from "yup";

export function useAuthViewModel(this: any) {
	const [sendSMS,setSendSMS] = useState<boolean | 'error' | null>(null)
	
	const initialValues = {
		phone:''
	}

	const formik = useFormik({
		initialValues,
		validationSchema: yup.object().shape({
			phone: valid.phone
		}),
		onSubmit: (values, meta) => {
			
			handlerSMSSend(values.phone)
		},
	});



	const handlerSMSSend = async (phone:string) =>{
		try {
			if(phone){
				await requestUser.smsSend(phone)
				setSendSMS(true)
			}
			
		} catch (error) {
			setSendSMS('error')
		}
	}





	this.data({
		formik,
		sendSMS
	});
	this.handlers({
		setSendSMS
	});
	this.status({

	});
}