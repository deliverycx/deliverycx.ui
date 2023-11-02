import { orderModel, orderUseCase } from "modules/OrderModule/order.module"
import { FC, useEffect, useState } from "react"
import OrderOnspotSelect from "./OrderOnspotSelect";
import { IDeliveryTypes } from 'modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type';
import { IOrderOnspotTable } from "modules/OrderModule/interfaces/order.type";
import cn from "classnames"
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import OrderOnspotSelectQueue from "./OrderOnspotSelectQueue";

const HOCOrderOnspotSelect: FC<{ deliveryType: IDeliveryTypes | null, organization: IOrganization }> = ({ deliveryType, organization }) => {

	const {orderOnspotTable} = orderModel

	
	useEffect(()=>{
		if(!orderOnspotTable){
			orderUseCase.onSpotTable()
		}
	},[])



	const handlerChangeOnSpot = (spot:IOrderOnspotTable) =>{
		orderUseCase.setOnSpotTable(spot)

	}

	console.log(orderOnspotTable);
	
	return (
		<>
		
			{
				(orderOnspotTable && orderOnspotTable.section !== 'queue') && organization &&
				<OrderOnspotSelect onSpotTable={orderOnspotTable} set={handlerChangeOnSpot} organization={organization} />
			}
			{
				(orderOnspotTable && orderOnspotTable.section === 'queue') && organization &&
				<OrderOnspotSelectQueue organization={organization} />
			}

		</>
	)
}
export default HOCOrderOnspotSelect