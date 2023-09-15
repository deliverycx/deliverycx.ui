/* eslint-disable @typescript-eslint/no-var-requires */
import { useContext } from "react"
import { PointsContext } from "./HOC.OrganizationCard"
import { Carousel } from 'react-responsive-carousel';
import OranizationWorkTime from "./view/OranizationWorkTime";
import OrganizationCardFilter from "./view/OrganizationCardFilter";
import { imgRoutDef } from "application/helpers/imgAdmin";
import OrganizationTipeDelivery from "./view/OrganizationTipeDelivery";
import OrganizationTableRestaurant from "./view/OrganizationTableRestaurant";




const OrganizationCard = () => {
	const useCasePoints = useContext(PointsContext)
	const { selectOrganization, deliveryTipe, timeworkOrganization } = useCasePoints.data
	const { setCardModal, handlerCloseCardModal } = useCasePoints.handlers


	return (
		<>
			<h3>
				{selectOrganization.info.address}
			</h3>
			<div className="d-flex gap-16 flex-center">
				<div className="institute-header__rating">
					<img src={require("assets/images/icons/star.svg").default} alt="" />
					<span>4,8</span>
					<span>(1158)</span>
				</div>
				<div className="institute-header__goodplace">
					<img src={require("assets/images/icons/yandex_znak.svg").default} alt="" />
					<span>Хорошее место</span>
				</div>
			</div>
			<div className="institute-counter">
				<h4>Съедено хинкали</h4>
				<div className="counter-wrapper">
					123
				</div>
			</div>
		</>
	)
}
export default OrganizationCard