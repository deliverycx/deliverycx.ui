import { TadapterCaseCallback, adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganizationCardViewModel } from "./OrganizationCard.viewModel"
import { FC, useState, useEffect, useMemo, useRef } from 'react';
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
import { createPortal } from "react-dom";
import Slider from "react-slick";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { useCaseOrganization, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module";
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

export const PointsContext = React.createContext<TadapterCaseCallback>({
	data: {},
	handlers: {},
	status: {}
});
const HOCOrganizationCard: FC<{ organizations: IOrganization[] }> = ({ organizations }) => {
	const useCase = adapterComponentUseCase(useOrganizationCardViewModel)

	const { selectOrganization, timeworkOrganization, cardModal, deliveryTipe } = useCase.data
	const { setCardModal, handlerCloseCardModal } = useCase.handlers
	const sw = useRef<any>()


	useEffect(()=>{
		if(cardModal && selectOrganization){
			const findindex = organizations.findIndex(val => val.guid === selectOrganization.guid)
			sw && sw.current && sw.current.slideToLoop(findindex, 500);
		}
	},[cardModal,sw.current])

	//
	return (
		<>
			<PointsContext.Provider value={useCase}>
				{
					cardModal && selectOrganization &&
					<ModalCard setIsOpened={handlerCloseCardModal}>


						{

							organizations &&
							<Swiper

								
								spaceBetween={0}
								loop={true}
								slidesPerView={1.1}
								centeredSlides={true}
							
								className="organization_slide"
								onSwiper={(swiper) => sw.current = swiper}
							
								onRealIndexChange={(swiper) => {
									useCaseOrganization.selectOrganization(organizations[swiper.realIndex])
									appUseCase.crealPoint()
								}}
							>

								{
									organizations.map((organization: IOrganization, index) => {

										return (


											<SwiperSlide key={organization.guid} >
												{({ isActive,isVisible }) => (
													<OrganizationCardItem active={isActive} viseble={isVisible}  organization={organization} />
												)}

											</SwiperSlide>




										)

									})
								}



							</Swiper>


						}


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