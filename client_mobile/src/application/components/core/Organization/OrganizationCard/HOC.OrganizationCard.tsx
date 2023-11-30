import { TadapterCaseCallback, adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganizationCardViewModel } from "./OrganizationCard.viewModel"
import { FC, useState } from 'react';
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
import { useCaseOrganization } from "modules/OrganizationModule/organization.module";
import OrganizationCardItem from "./OrganizationCardItem";
import { appUseCase } from "modules/AppModule/app.module";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { FreeMode, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';

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



	return (
		<>
			<PointsContext.Provider value={useCase}>
				{
					cardModal && selectOrganization && deliveryTipe &&
					<ModalCard setIsOpened={handlerCloseCardModal}>


						{

							organizations &&
							<Swiper

								modules={[Virtual]}
								spaceBetween={0}
								loop={true}
								slidesPerView={1.1} virtual
								centeredSlides={true}

								className="organization_slide"

								onSlideChange={() => console.log('slide change')}
								onSwiper={(swiper) => console.log(swiper)}
							>

								{
									organizations.map((organization: IOrganization, index) => {

										return (


											<SwiperSlide key={organization.guid} virtualIndex={index}>
												{({ isActive }) => (
													<OrganizationCardItem organization={organization} />
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