import { organizationModel, organizationStatusModel } from "modules/OrganizationModule/organization.module";
import { FormBuilderTabsOrder } from "./view/OrderFormBuilderTabs";
import { OrderFormPayMetods } from "./view/OrderFormPayMetods";
import { useEffect, useRef, useState } from 'react';
import { DELIVERY_METODS, PAYMENT_METODS } from "application/contstans/const.orgstatus";
import { useFormik } from "formik";
import schema from "application/helpers/validationSchema";
import { orderCreateUseCase, orderModel } from "modules/OrderModule/order.module";
import { userModel } from "modules/UserModule/user.module";
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from './../../../../contstans/route.const';
import { profileModel } from "modules/Profile/profile.module";

export function useOrderFromViewModel(this:any) {
	const navigate = useNavigate()
	const {selectDeliveryTipe,paymentMetod} = organizationStatusModel
	const {selectOrganization} = organizationModel
	const {orderBody,orderOnspotTable} = orderModel
	const {profile} = profileModel


	const [error,setError] = useState()
	
	
	const [builder,setBuilder] = useState<any>()
	
	
	const initialValues = orderBody
	const formik = useFormik({
		initialValues,
		validationSchema: schema(selectDeliveryTipe?.metod as string),
		onSubmit: async (values, meta) => {
			try {
				
				formik.setSubmitting(true)
				const url:any = await orderCreateUseCase.orderCheck()
				formik.setSubmitting(false)
				if(typeof url === 'string'){
					navigate(`${ROUTE_APP.ORDER.ORDER_CREATE}/${url}`)
				}
				if(url.response.data.errors){
					setError(url.response.data.errors)
				}
				
				//
			} catch (error:any) {
				//console.log(error.response.data);
				
			}
			
		},
	});


	useEffect(()=>{
		if(profile && profile.personal){
			
			profile.personal.phone && formik.setFieldValue('phone',profile.personal.phone)
			profile.personal.name && formik.setFieldValue('name',profile.personal.name)
		}
	},[profile])

	useEffect(()=>{
		if(selectDeliveryTipe){
			switch(selectDeliveryTipe.metod){
				case DELIVERY_METODS.COURIER :			
					setBuilder({current:FormBuilderTabsOrder.delivery(OrderFormPayMetods)}) 
				break;
				case DELIVERY_METODS.PICKUP :
					setBuilder({current:FormBuilderTabsOrder.pickup(OrderFormPayMetods)}) 
				break;
				case DELIVERY_METODS.ONSPOT :
					setBuilder({current:FormBuilderTabsOrder.onspot(OrderFormPayMetods)}) 
				break;
				default : setBuilder({current:null}) 
			}
		}else{
			orderOnspotTable?.section === 'queue' && 
			setBuilder({current:FormBuilderTabsOrder.onspot(OrderFormPayMetods)}) 
		}

		
	},[selectDeliveryTipe,orderOnspotTable])



	useEffect(()=>{
		orderModel.actionOrderBody(formik.values)
	},[formik.values])
		

	
	
	this.data({
		builder,
		selectDeliveryTipe,
		selectOrganization,
		paymentMetod,
		formik,
	});
	this.handlers({
		
	});
	this.status({
		error
	});


}