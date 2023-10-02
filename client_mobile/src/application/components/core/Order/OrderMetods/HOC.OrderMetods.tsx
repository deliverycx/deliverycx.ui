import { observer } from "mobx-react-lite"
import OrderMetodsTabs from "./OrderMetodsTabs"
import { organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { useEffect } from 'react';

const HOCOrderMetods = () =>{
	const {deliveryTipe,selectDeliveryTipe} = organizationStatusModel
	
	useEffect(()=>{
		if(selectDeliveryTipe){
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