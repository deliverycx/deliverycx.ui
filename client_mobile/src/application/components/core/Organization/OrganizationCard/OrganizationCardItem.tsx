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
import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { observer } from "mobx-react-lite"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"


type IProps = {
	organization: IOrganization
	active: any
}

const OrganizationCardItem: FC<IProps> = ({ organization, active }) => {
	const useCasePoints = useContext(PointsContext)
	const { timeworkOrganization, deliveryTipe, selectOrganization } = useCasePoints.data
	const { handlerCloseCardModal } = useCasePoints.handlers



	return (
		<div className="modal__wrapper map__institute-info">
			<div onClick={handlerCloseCardModal} className="map__institute-close no-drag">
				<img src={require('assets/images/icons/close_gray.png')} alt="" />
			</div>

			{
				organization.gallery && organization.gallery.length !== 0 &&
				<Carousel showThumbs={false} autoPlay={true} showArrows={false} showStatus={false}>
					{organization.gallery.map((image: string, index: number) => (
						<img key={index} src={imgRoutDef(image)} alt="" />
					))}
				</Carousel>
			}
			<div className="map__institute-content no-drag">
				<div className="institute-header">

					<OrganizationCard organization={organization} />
					{
						active &&
						<>
							<OragnizationRequisities organization={organization} />
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
				</div>
			</div>


		</div>
	)
}
export default observer(OrganizationCardItem)
//<OrganizationCounterHi point={organization} /> 
/**
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