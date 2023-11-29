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


export const PointsContext = React.createContext<TadapterCaseCallback>({
	data: {},
	handlers: {},
	status: {}
});
const HOCOrganizationCard: FC<{ organizations: IOrganization[] }> = ({ organizations }) => {
	const useCase = adapterComponentUseCase(useOrganizationCardViewModel)

	const { selectOrganization, timeworkOrganization, cardModal, deliveryTipe } = useCase.data
	const { setCardModal, handlerCloseCardModal } = useCase.handlers

	const [swaipe,setSwaipe] = useState(false)

	const settings = {
		className: "center",
		centerMode: true,
		infinite: true,

		centerPadding: "20px",
		slidesToShow: 1,
		speed: 500,
		rows: 1,
		slidesPerRow: 1,
		dots: false,
		arrows: false,
		adaptiveHeight: true,
		beforeChange:(oldIndex:number, newIndex:number) =>{
			//console.log('beforeChange',organizations[newIndex].info.address,selectOrganization.info.address);
			//useCaseOrganization.selectOrganization(organizations[newIndex])
		},
		afterChange: (index: number) => {
			//console.log('afterChange',organizations[index]);
			//useCaseOrganization.selectOrganization(organizations[index])
			
		},
		//onSwipe:() => useCaseOrganization.selectOrganization(null),
		//onLazyLoad:(q:any) => console.log('onEdge',q)
	
	};

	//console.log(selectOrganization);


	return (
		<>
			<PointsContext.Provider value={useCase}>
				{
					cardModal && selectOrganization && deliveryTipe &&
					<ModalCard setIsOpened={handlerCloseCardModal}>

						{
							organizations &&
							<Slider {...settings} className="organization_slide">
								{
									organizations.map((org: IOrganization) => {
										return (
											<OrganizationCardItem key={org.guid} organization={org} />
											
										)
									})
								}
							</Slider>

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