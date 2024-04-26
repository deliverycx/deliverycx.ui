import { TadapterCaseCallback, adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganizationCardViewModel } from "./OrganizationCard.viewModel"
import { FC, useState, useEffect, useMemo, useRef } from 'react';
import OrganizationCard from "./view/OrganizationCard";
import React from "react";
import { observer } from "mobx-react-lite"
import ModalCard from "application/components/common/Modals/ModalCard";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import OrganizationCardItem from "./OrganizationCardItem";
import { appUseCase } from "modules/AppModule/app.module";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { FreeMode, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';


import { useSwiper } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import { organizationModule } from "modules/OrganizationModule/organization.module";
import OrganizationSwipe from "./OrganizationSwipe";

export const PointsContext = React.createContext<TadapterCaseCallback>({
	data: {},
	handlers: {},
	status: {}
});
const HOCOrganizationCard: FC<{ organizations: IOrganization[],pointIndex:string }> = ({ organizations,pointIndex }) => {
	const useCase = adapterComponentUseCase(useOrganizationCardViewModel)

	const { selectOrganization, timeworkOrganization, cardModal, point } = useCase.data
	const { setCardModal, handlerCloseCardModal } = useCase.handlers


	

	/*
	useEffect(()=>{
		
		if(cardModal && selectOrganization){
			const findindex = organizations.findIndex(val => val.guid === pointIndex)
			sw && sw.current && sw.current.slideToLoop(findindex, 500);
		}
	},[cardModal,pointIndex,sw.current])
	*/

	


	//
	return (
		<>
			<PointsContext.Provider value={useCase}>
				{
					cardModal &&
					<ModalCard setIsOpened={handlerCloseCardModal}>

						<OrganizationSwipe organizations={organizations} point={point} />

					</ModalCard>
				}

			</PointsContext.Provider>

		</>
	)
}
export default observer(HOCOrganizationCard)

/*
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
											<OrganizationStatus />
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


								</div>
*/