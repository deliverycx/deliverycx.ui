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

const HOCOrganizationCardDesc = () => {
	const useCase = adapterComponentUseCase(useOrganizationCardViewModel)
	const { selectOrganization, timeworkOrganization, cardModal, deliveryTipe } = useCase.data
	const { setCardModal, handlerCloseCardModal } = useCase.handlers

	const [load, setLoad] = useState(true)

	useEffect(() => {
		let tiks: any
		if (selectOrganization) {
			tiks = setTimeout(() => {
				setLoad(false)
			}, 500)
			useCaseOrganizationStatus.statusOrganization()
		}


		return () => clearTimeout(tiks)
	}, [selectOrganization])

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	return (
		<>
			{
				selectOrganization &&
				<ModalCard setIsOpened={() => handlerCloseCardModal()} theme="children" styles="organization_modal">
					<div className="modal__wrapper map__institute-info">
						<div onClick={handlerCloseCardModal} className="map__institute-close no-drag">
							<img src={require('assets/images/icons/close_gray.png')} alt="" />
						</div>

						{
							selectOrganization.gallery && selectOrganization.gallery.length !== 0 &&
							<Slider {...settings} className="carousel">
								{selectOrganization.gallery.map((image: string, index: number) => (
									<img key={index} src={imgRoutDef(image)} alt="" />
								))}
							</Slider>
						}
						<div className="map__institute-content no-drag">
							<div className="institute-header">

								<OrganizationCard organization={selectOrganization} />
								<OrganizationStatus organization={selectOrganization} />
								{
									!load ?
										<>
											<OrganizationCounterHi point={selectOrganization} />
											<OragnizationRequisities organization={selectOrganization} />
										</>
										: <LoaderProduct />
								}
								{
									timeworkOrganization &&
									<OranizationWorkTime organization={selectOrganization} />
								}
								{
									selectOrganization.filters && selectOrganization.filters.length !== 0 &&
									<OrganizationCardFilter organization={selectOrganization} />
								}
								{
									timeworkOrganization && deliveryTipe &&
									<OrganizationTipeDelivery organization={selectOrganization} />
								}
								<OrganizationTableRestaurant organization={selectOrganization} />
							</div>
						</div>


					</div>

				</ModalCard>
			}
		</>

	)
}
export default observer(HOCOrganizationCardDesc) 