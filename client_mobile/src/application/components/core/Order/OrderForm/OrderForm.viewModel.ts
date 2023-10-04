import { organizationModel, organizationStatusModel } from "modules/OrganizationModule/organization.module";
import { FormBuilderTabsOrder } from "./view/OrderFormBuilderTabs";
import { OrderFormPayMetods } from "./view/OrderFormPayMetods";
import { useEffect, useRef, useState } from 'react';
import { DELIVERY_METODS, PAYMENT_METODS } from "application/contstans/const.orgstatus";
import { useFormik } from "formik";
import schema from "application/helpers/validationSchema";
import { orderModel } from "modules/OrderModule/order.module";

export function useOrderFromViewModel(this:any) {
	const {selectDeliveryTipe,paymentMetod} = organizationStatusModel
	const {selectOrganization} = organizationModel
	const {orderBody} = orderModel
	const [builder,setBuilder] = useState<any>()
	
	
	const initialValues = orderBody
	const formik = useFormik({
		initialValues,
		validationSchema: schema(selectDeliveryTipe?.metod as string),
		onSubmit: (values, meta) => {
			console.log(values);

		},
	});

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
		}
		
	},[selectDeliveryTipe])


	useEffect(()=>{
		orderModel.actionOrderBody(formik.values)
	},[formik.values])

	
	
	this.data({
		builder,
		selectDeliveryTipe,
		selectOrganization,
		paymentMetod,
		formik
	});
	this.handlers({
		
	});
	this.status({

	});


}