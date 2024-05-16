import { useOrganizationStatus } from "application/hooks/useOrganizationStatus"
import { basketUseCase } from "modules/BasketModule/basket.module"
import { organizationModel, organizationStatusModel, organizationStatusModule, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import HOCOrderMetods from "./OrderMetods/HOC.OrderMetods"
import HOCOrderForm from "./OrderForm/HOC.OrderForm"
import LayoutDesctop from "application/components/common/Layout/LayoutDesctop"
import cn from "classnames"
import { observer } from "mobx-react-lite"
import HOCDeliveryMapDesc from "application/components/common/Maps/DeliveryMap/HOC.DeliveryMap.desc"
import { ROUTE_APP } from "application/contstans/route.const"
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type"
import { IOrganizationStatus } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type"

const HOCOrderDesc = () => {
	const navigate = useNavigate()
	//const [statusTSX, switchMetod] = useOrganizationStatus()
	const { paymentMetod } = organizationStatusModel
	const params = useLocation()

	const point = organizationModel.selectOrganization
	const [organizationStatus,setOrganizationStatus] =  useState<IOrganizationStatus | null>(null)
	
	const [statusTSX, switchMetod] =  useOrganizationStatus(point)
	

	/**/
	useQuery('pointstatus', () => organizationStatusModule.handlerBus.handlerOrganizationsListStatus(point as IOrganization), {
		refetchOnWindowFocus: true,
		enabled: !!point,
	})
	

	useEffect(() => {
		basketUseCase.cartCase()
		organizationStatusModule.queryBus.handlerOrganizationStatus((data:IOrganizationStatus) =>{
			organizationStatusModel.actionOrganizationStatus(data)
			setOrganizationStatus(data)
		})
	}, [])

	const CN = cn("order-placement__form", { 'close-soon': statusTSX && statusTSX.NoTimeWork() }) //statusTSX.NoTimeWork() 
	return (
		<LayoutDesctop>
			<div className="order-desc">
				<h1>Оформление заказа</h1>
				<div className={CN}>
					{
						paymentMetod &&
						<HOCOrderForm paymentMetod={paymentMetod} />
					}
					{
						params.pathname.includes(ROUTE_APP.ORDER.ORDER_MAP) &&
						<HOCDeliveryMapDesc />
					}
				</div>
			</div>
		</LayoutDesctop>
	)
}
export default observer(HOCOrderDesc) 