/* eslint-disable @typescript-eslint/no-var-requires */
import { useContext, useEffect } from "react";
import { PointsContext } from "../HOC.OrganizationCard"
import OragnizationRequisities from "./OragnizationRequisities";

const OrganizationCard = () => {
	const useCasePoints = useContext(PointsContext)
	const { selectOrganization, goodPlaceId } = useCasePoints.data

	return (
		<>
			<h3>
				{selectOrganization.info.address}
			</h3>
			<div className="d-flex gap-16 flex-center">
				<div className="institute-header__rating">
					{
						goodPlaceId && <iframe src={`https://yandex.ru/sprav/widget/rating-badge/${goodPlaceId}?type=award`} width="150" height="50" frameBorder="0"></iframe>
					}
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