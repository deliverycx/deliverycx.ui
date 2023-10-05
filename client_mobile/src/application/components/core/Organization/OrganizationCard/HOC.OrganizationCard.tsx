import { TadapterCaseCallback, adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganizationCardViewModel } from "./OrganizationCard.viewModel"
import { useState } from 'react';
import OrganizationCard from "./view/OrganizationCard";
import React from "react";
import { observer } from "mobx-react-lite"
import ModalCard from "application/components/common/Modals/ModalCard";
import { imgRoutDef } from "application/helpers/imgAdmin";
import { Carousel } from "react-responsive-carousel";
import OranizationWorkTime from "./view/OranizationWorkTime";
import OrganizationCardFilter from "./view/OrganizationCardFilter";
import OrganizationTableRestaurant from "./view/OrganizationTableRestaurant";
import OrganizationTipeDelivery from "./view/OrganizationTipeDelivery";
import OrganizationStatus from "./view/OrganizationStatus";

export const PointsContext = React.createContext<TadapterCaseCallback>({
	data: {},
	handlers: {},
	status: {}
});
const HOCOrganizationCard = () => {
	const useCase = adapterComponentUseCase(useOrganizationCardViewModel)
	const { selectOrganization, timeworkOrganization, cardModal, deliveryTipe } = useCase.data
	const { setCardModal, handlerCloseCardModal } = useCase.handlers

	return (
		<>
			<PointsContext.Provider value={useCase}>
				{
					cardModal && selectOrganization && deliveryTipe &&
						<ModalCard setIsOpened={setCardModal}>
						<div className="modal__wrapper map__institute-info">
							<div onClick={handlerCloseCardModal} className="map__institute-close no-drag">
								<img src={require('assets/images/icons/close_gray.png')} alt="" />
							</div>
							
							{
								selectOrganization.gallery && selectOrganization.gallery.length !== 0 &&
								<Carousel showThumbs={false} autoPlay={true} showArrows={false} showStatus={false}>
									{selectOrganization.gallery.map((image: string, index: number) => (
										<img key={index} src={imgRoutDef(image)} alt="" />
									))}
								</Carousel>
							}
							<div className="map__institute-content no-drag">
								<div className="institute-header">
									<OrganizationCard />
									{
										timeworkOrganization &&
										<OranizationWorkTime />
									}
									{
										selectOrganization.filters && selectOrganization.filters.length !== 0 &&
										<OrganizationCardFilter organization={selectOrganization} />
									}
									{
										timeworkOrganization && deliveryTipe &&
										<OrganizationTipeDelivery />
									}
									<OrganizationTableRestaurant />
								</div>
							</div>
							<OrganizationStatus />

						</div>
					</ModalCard>
				}

			</PointsContext.Provider>

		</>
	)
}
export default observer(HOCOrganizationCard)
