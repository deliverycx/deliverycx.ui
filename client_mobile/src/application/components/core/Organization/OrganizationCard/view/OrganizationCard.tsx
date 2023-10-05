/* eslint-disable @typescript-eslint/no-var-requires */
import { useContext, useEffect } from "react";
import { PointsContext } from "../HOC.OrganizationCard"
import OragnizationRequisities from "./OragnizationRequisities";
import {
	requestOrganizationAdmin
} from "../../../../../../modules/OrganizationModule/Organization/data/organization.request";
import { organizationModel } from "../../../../../../modules/OrganizationModule/organization.module";

const OrganizationCard = () => {
	const useCasePoints = useContext(PointsContext)
	const { selectOrganization, goodPlaceId, guid } = useCasePoints.data
	// console.log(goodPlaceId);
	// console.log('asdasdsa');
	//
	// useEffect(() => {
	// 	const getGoodPlaceId = async () => {
	// 		try {
	// 			const { data } = await requestOrganizationAdmin.getByOrganizationGoodPlaceId(organizationModel.selectOrganization?.guid)
	// 			console.log(data, 'GOODPLACE ORGA');
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	//
	// 	getGoodPlaceId()
	// }, [organizationModel.selectOrganization?.guid])

	return (
		<>
			<h3>
				{selectOrganization.info.address}
			</h3>
			<div className="d-flex gap-16 flex-center">
				<div className="institute-header__rating">
				{/*<iframe src={`https://yandex.ru/sprav/widget/rating-badge/${}?type=award`} width="150" height="50" frameBorder="0"></iframe>*/}
				</div>

			</div>
			<div className="institute-counter">
				<h4>Съедено хинкали</h4>
				<div className="counter-wrapper">
					123
				</div>
			</div>
			<OragnizationRequisities />
		</>
	)
}
export default OrganizationCard