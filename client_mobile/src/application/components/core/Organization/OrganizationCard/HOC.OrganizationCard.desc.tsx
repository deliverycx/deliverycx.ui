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
	const { point, cardModal } = useCase.data


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