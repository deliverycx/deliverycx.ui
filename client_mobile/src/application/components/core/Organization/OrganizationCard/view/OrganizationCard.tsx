/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, useContext, useEffect, useState } from "react";
import { PointsContext } from "../HOC.OrganizationCard"
import OragnizationRequisities from "./OragnizationRequisities";
import OrganizationCounterHi from "./OrganizationCounter/OrganizationCounterHi";
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { requestOrganizationAdmin } from "modules/OrganizationModule/Organization/data/organization.request";

const OrganizationCard:FC<{organization:IOrganization}> = ({organization}) => {
	const [goodPlaceId, setGoodPlaceId] = useState<string>('')

	useEffect(() => {
		const getGoodPlaceId = async () => {
			try {
				const { data } = await requestOrganizationAdmin.getByOrganizationGoodPlaceId(organization.guid)
				setGoodPlaceId(data.goodplaceid)
			} catch (error) {
				console.log(error);
			}
		}

		getGoodPlaceId()
	}, [organization.guid])
	return (
		<>
			<h3>
				{organization.info.address}, {organization.info.city}
			</h3>
			<div className="d-flex gap-16 flex-center">
				<div className="institute-header__rating">
					{
						goodPlaceId && 
						<div className="goodpalese"><iframe src={`https://yandex.ru/sprav/widget/rating-badge/${goodPlaceId}?type=award`} width="150" height="50" frameBorder="0"></iframe></div>
					}
				</div>

			</div>
			
		</>
	)
}
export default OrganizationCard