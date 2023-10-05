/* eslint-disable @typescript-eslint/no-var-requires */
import { useContext } from "react"
import { PointsContext } from "../HOC.OrganizationCard"
import { Carousel } from 'react-responsive-carousel';
import OranizationWorkTime from "./OranizationWorkTime";
import OrganizationCardFilter from "./OrganizationCardFilter";
import { imgRoutDef } from "application/helpers/imgAdmin";
import OrganizationTipeDelivery from "./OrganizationTipeDelivery";
import OrganizationTableRestaurant from "./OrganizationTableRestaurant";
import axios from "axios";
import OragnizationRequisities from "./OragnizationRequisities";

const OrganizationCard = () => {
	const useCasePoints = useContext(PointsContext)
	const { selectOrganization, deliveryTipe, timeworkOrganization, guid } = useCasePoints.data
	const { setCardModal, handlerCloseCardModal } = useCasePoints.handlers

	return (
		<>
			<h3>
				{selectOrganization.info.address}
			</h3>
			<div className="d-flex gap-16 flex-center">
				<div className="institute-header__rating">
				<iframe src="https://yandex.ru/sprav/widget/rating-badge/14570445460?type=award" width="150" height="50" frameBorder="0"></iframe>
				</div>

			</div>
			<div className="institute-counter">
				<h4>Съедено хинкали</h4>
				<div className="counter-wrapper">
					<img src={require('assets/images/coutner.png')} />
				</div>
			</div>
			<OragnizationRequisities />
		</>
	)
}
export default OrganizationCard