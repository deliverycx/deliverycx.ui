import { orderModel, orderUseCase } from "modules/OrderModule/order.module"
import { FC, useEffect, useState } from "react"
import OrderOnspotSelect from "./OrderOnspotSelect";
import { IDeliveryTypes } from 'modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type';
import { IOrderOnspotTable } from "modules/OrderModule/interfaces/order.type";
import cn from "classnames"
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import OrderOnspotSelectQueue from "./OrderOnspotSelectQueue";

const HOCOrderOnspotSelect: FC<{ deliveryType: IDeliveryTypes, organization: IOrganization }> = ({ deliveryType, organization }) => {
	const [onSpotTable, setOnspotTable] = useState<IOrderOnspotTable | null>(null)
	const [onSpotTables, setOnspotTables] = useState<IOrderOnspotTable | null>(null)

	useEffect(() => {
		const table = orderUseCase.onSpotTable()
		if (table) {
			table.then((data) => {
				data && setOnspotTable(data)
			})
		}
	}, [deliveryType.metod])



	const handlerChangeOnSpot = (spot:IOrderOnspotTable) =>{
		orderUseCase.setOnSpotTable(spot)
		setOnspotTable(spot)
	}


	console.log(onSpotTable);

	const CNONSPOT = cn("onspot_tabs-item", { selected: onSpotTable?.section !== 'queue' })
	const CNOQueue = cn("onspot_tabs-item", { selected: onSpotTable?.section === 'queue' })
	return (
		<>
			<div className="onspot_tabs">
				{
					onSpotTable &&
					<div className="onspot_tabsbox">
						<div className={CNONSPOT}>
							<img src={require("assets/images/icons/onspot.png")} />
						</div>
						<div className={CNOQueue}>
							<img src={require("assets/images/icons/onspotqueue.png")} />
						</div>
					</div>
				}
			</div>
			{
				(onSpotTable && onSpotTable.section !== 'queue') && organization
					?	<OrderOnspotSelect onSpotTable={onSpotTable} organization={organization} />
					: <OrderOnspotSelectQueue organization={organization} />
			}

		</>
	)
}
export default HOCOrderOnspotSelect