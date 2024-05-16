import { observer } from "mobx-react-lite"
import OrderMetodsTabs from "./OrderMetodsTabs"
import { organizationStatusModel, organizationStatusModule, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';
import { basketUseCase } from "modules/BasketModule/basket.module";


const HOCOrderMetods = () =>{
	const {deliveryTipe,selectDeliveryTipe,organizationStatusMetods} = organizationStatusModel
	
	useEffect(()=>{
		
			
		
		if(!selectDeliveryTipe && deliveryTipe && organizationStatusMetods){
			const resultType = useCaseOrganizationStatus.selectActiveDeliveryType(organizationStatusMetods,deliveryTipe.slice().sort((a:any, b:any) => a['sort'] > b['sort'] ? 1 : -1)[0])
			resultType && organizationStatusModel.actionSelectDeliveryTipe(resultType)
		}
		
	},[selectDeliveryTipe])
	
	

	return(
		<>
		{
			deliveryTipe &&
			<OrderMetodsTabs />
		}
		
		</>
	)
}
export default observer(HOCOrderMetods)