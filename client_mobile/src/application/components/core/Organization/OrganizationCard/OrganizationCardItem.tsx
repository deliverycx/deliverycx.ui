/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { imgRoutDef } from "application/helpers/imgAdmin"
import { Carousel } from "react-responsive-carousel"
import OranizationWorkTime from "./view/OranizationWorkTime"
import OrganizationCard from "./view/OrganizationCard"
import OrganizationCardFilter from "./view/OrganizationCardFilter"
import OrganizationStatus from "./view/OrganizationStatus"
import OrganizationTableRestaurant from "./view/OrganizationTableRestaurant"
import OrganizationTipeDelivery from "./view/OrganizationTipeDelivery"
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type"
import { FC, memo, useContext, useEffect, useState } from "react"
import { PointsContext } from "./HOC.OrganizationCard"
import OrganizationCounterHi from "./view/OrganizationCounter/OrganizationCounterHi"
import OragnizationRequisities from "./view/OragnizationRequisities"
import { organizationModel, useCaseOrganizationStatus } from 'modules/OrganizationModule/organization.module';
import { observer } from "mobx-react-lite"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import Slider from "react-slick"
import { IOrganizationStatus } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type"


type IProps = {
	organization: IOrganization & IOrganizationStatus
	active: any
	viseble: any
}

const OrganizationCardItem: FC<IProps> = ({ organization, active, viseble }) => {
	const useCasePoints = useContext(PointsContext)
	const { timeworkOrganization, deliveryTipe, selectOrganization } = useCasePoints.data
	const { handlerCloseCardModal } = useCasePoints.handlers
	const [load, setLoad] = useState(true)

	useEffect(() => {
		let tiks: any
		if (active) {
			tiks = setTimeout(() => {
				setLoad(false)
			}, 500)
			//useCaseOrganizationStatus.statusOrganization()
		}


		return () => clearTimeout(tiks)
	}, [selectOrganization, active])

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	

	return (
		<>
		
		<div className="modal__wrapper map__institute-info">
			
			<div onClick={() => handlerCloseCardModal()} className="map__institute-close no-drag">
				<img src={require('assets/images/icons/close_gray.png')} alt="" />
			</div>

			{
				organization.gallery && organization.gallery.length !== 0 &&
				<Slider {...settings} className="carousel">
					{organization.gallery.map((image: string, index: number) => (
						<img key={index} src={imgRoutDef(image)} alt="" />
					))}
				</Slider>
			}
			<div className="map__institute-content no-drag">
				<div className="institute-header">
				<OrganizationCard organization={organization} />
				<OrganizationStatus organization={organization} />
					{
						active && !load ?
							<>
								<OrganizationCounterHi point={organization} />
								
							</>
							: <LoaderProduct />
					}
					
					<OranizationWorkTime organization={organization}/>
					{
						organization.filters && organization.filters.length !== 0 &&
						<OrganizationCardFilter organization={organization} />
					}
					<OrganizationTipeDelivery organization={organization} />
					
					{
						active && !load &&
						<OragnizationRequisities organization={organization} />
					}	
				</div>
			</div>


		</div>
		</>
	)
}
export default observer(OrganizationCardItem)
//<OrganizationCounterHi point={organization} /> 
/**
 *<OrganizationCard organization={organization} />
 *  <OrganizationStatus organization={organization} />
					{
						active && !load ?
							<>
								<OrganizationCounterHi point={organization} />
								
							</>
							: <LoaderProduct />
					}
					
					<OranizationWorkTime organization={organization}/>
					{
						organization.filters && organization.filters.length !== 0 &&
						<OrganizationCardFilter organization={organization} />
					}
					<OrganizationTipeDelivery organization={organization} />
					<OrganizationTableRestaurant organization={organization} />
					{
						active && !load &&
						<OragnizationRequisities organization={organization} />
					}
 * 
 * 
 * 
 * {
															selectOrganization &&
															<>
																
																<OragnizationRequisities />
																<OrganizationStatus />
																{
																	timeworkOrganization &&
																	<OranizationWorkTime />
																}
															</>
														}
														
														{
															organization.filters && organization.filters.length !== 0 &&
															<OrganizationCardFilter organization={organization} />
														}
														{
															timeworkOrganization && deliveryTipe &&
															<OrganizationTipeDelivery />
														}
														<OrganizationTableRestaurant organization={organization} />
 */