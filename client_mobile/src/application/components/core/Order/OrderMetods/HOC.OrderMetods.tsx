import { observer } from "mobx-react-lite"
import OrderMetodsTabs from "./OrderMetodsTabs"
import { organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';

const HOCOrderMetods = () =>{
	const {deliveryTipe,selectDeliveryTipe} = organizationStatusModel
	const navigate = useNavigate()
	
	useEffect(()=>{
		if(selectDeliveryTipe && deliveryTipe){
			deliveryTipe.forEach((el) =>{
				if(el.metod !== selectDeliveryTipe.metod){
					//navigate(ROUTE_APP.MAIN)
				}
			})
			useCaseOrganizationStatus.statusOrganization()
		}
		
	},[selectDeliveryTipe])

	

	return(
		<>
		{
			deliveryTipe &&
			<OrderMetodsTabs deliveryTabs={deliveryTipe} />
		}
		
		</>
	)
}
export default observer(HOCOrderMetods)