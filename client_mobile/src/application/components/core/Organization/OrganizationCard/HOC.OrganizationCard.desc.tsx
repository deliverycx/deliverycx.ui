import { imgRoutDef } from "application/helpers/imgAdmin"
import { Carousel } from "react-responsive-carousel"
import OranizationWorkTime from "./view/OranizationWorkTime"
import OrganizationCard from "./view/OrganizationCard"
import OrganizationCardFilter from "./view/OrganizationCardFilter"
import OrganizationStatus from "./view/OrganizationStatus"
import OrganizationTableRestaurant from "./view/OrganizationTableRestaurant"
import OrganizationTipeDelivery from "./view/OrganizationTipeDelivery"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganizationCardViewModel } from "./OrganizationCard.viewModel"
import ModalCard from "application/components/common/Modals/ModalCard"
import { observer } from 'mobx-react-lite';
import Slider from "react-slick"
import { useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { useState, useEffect } from "react"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import OragnizationRequisities from "./view/OragnizationRequisities"
import OrganizationCounterHi from "./view/OrganizationCounter/OrganizationCounterHi"
import OrganizationCardItem from "./OrganizationCardItem"
import { PointsContext } from "./HOC.OrganizationCard"

const HOCOrganizationCardDesc = () => {
	const useCase = adapterComponentUseCase(useOrganizationCardViewModel)
	const { point, timeworkOrganization, cardModal, deliveryTipe } = useCase.data
	const { setCardModal, handlerCloseCardModal } = useCase.handlers

	const [load, setLoad] = useState(true)

	/*
	useEffect(() => {
		let tiks: any
		if (selectOrganization) {
			tiks = setTimeout(() => {
				setLoad(false)
			}, 500)
			//useCaseOrganizationStatus.statusOrganization()
		}


		return () => clearTimeout(tiks)
	}, [selectOrganization])
	*/

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	return (
		<>
		<PointsContext.Provider value={useCase}>
			{
				cardModal &&
				<div className="modalcard_map">
					<OrganizationCardItem active={true} viseble={true}  organization={point} />
				</div>
			}
			</PointsContext.Provider>
		</>
		
	)
}
export default observer(HOCOrganizationCardDesc) 