import { observer } from "mobx-react-lite"
import OrderMetodsTabs from "./OrderMetodsTabs"
import { organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';
import { basketUseCase } from "modules/BasketModule/basket.module";


const HOCOrderMetods = () =>{
	const {deliveryTipe,selectDeliveryTipe} = organizationStatusModel
	const navigate = useNavigate()
	
	useEffect(()=>{
		if(selectDeliveryTipe){
			//useCaseOrganizationStatus.statusOrganization()
		}else{
			if(deliveryTipe){
				//useCaseOrganizationStatus.selectDeliveryMetod(deliveryTipe.slice().sort((a:any, b:any) => a['sort'] > b['sort'] ? 1 : -1)[0])
				basketUseCase.cartCase()
			}
			
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