import { IWorkTimePoint } from "modules/OrganizationModule/Organization/interfaces/organization.type"
import { IDeliveryTypes } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type"
import { FC, useContext, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { ROUTE_APP } from 'application/contstans/route.const';
import { DELIVERY_METODS } from "application/contstans/const.orgstatus";

import iconDelivery from "assets/images/icons/moped.png";
import iconSelfPickup from "assets/images/icons/self_pickup.png";
import iconTableRestaurant from "assets/images/icons/table_restaurant.png";
import iconQrCodeScanner from "assets/images/icons/qr_code_scanner.png";
import { useOrganizationStatus } from "application/hooks/useOrganizationStatus";
import { observer } from "mobx-react-lite";
import { PointsContext } from "../HOC.OrganizationCard";



const OrganizationTipeDelivery = () => {
	const useCasePoints = useContext(PointsContext)
	const { selectOrganization, deliveryTipe, timeworkOrganization } = useCasePoints.data
	const { setCardModal, handlerCloseCardModal } = useCasePoints.handlers
	const navigate = useNavigate()
	const [statusTSX, switchMetod] = useOrganizationStatus()

	useEffect(() => {
		if (!Array.isArray(deliveryTipe) || deliveryTipe.length === 0) {
			navigate(ROUTE_APP.MAIN)
		}
	}, [deliveryTipe])

	const icons = (type: string) => {
		switch (type) {
			case DELIVERY_METODS.COURIER: return iconDelivery
			case DELIVERY_METODS.ONSPOT: return iconQrCodeScanner
			case DELIVERY_METODS.PICKUP: return iconSelfPickup
		}
	}


	return (
		<div className="institute-buttons">
			{
				deliveryTipe.length !== 0 &&
					statusTSX.OpenPoint()
					? <button onClick={() => handlerCloseCardModal(false)} className="btn btn-mini btn-gray no-drag">Выбрать другую</button>
					: statusTSX.pointstatus
						? <NavLink to={"/shop"} className="btn btn-mini btn-gray no-drag">Посмотреть меню</NavLink>
					: deliveryTipe.map((type: IDeliveryTypes) => {
							if (timeworkOrganization.typework === 'ONWORK' && type.metod === DELIVERY_METODS.COURIER) {
								return (
									<button key={type.metod} disabled className="btn btn-mini btn-gray no-drag">
										<img src={icons(type.metod)} alt="" />
										{type.name}
									</button>
								)
							}
							return (
								<NavLink to={"/shop"} key={type.metod} className="btn btn-mini btn-gray no-drag">
									<img src={icons(type.metod)} alt="" />
									{type.name}
								</NavLink>
							)
						})

			}
		</div>
	)
}
export default observer(OrganizationTipeDelivery)