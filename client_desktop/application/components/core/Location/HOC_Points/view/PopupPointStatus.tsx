import { IPoint, IPointStatus } from "@types"
import { ORG_STATUS } from "application/contstans/const.orgstatus"
import { StatusTSX } from "application/hooks/useOrganizationStatus"
import { FC, useEffect, useState } from "react"
import RequestLocation from "servises/repository/Axios/Request/Request.Location"


type IProps = {
	organization: IPoint
	handler: any
}

const PopupPointStatus: FC<IProps> = ({ organization,handler }) => {
	const [status, setStatus] = useState<IPointStatus | null>(null)

	const tsx = status && new StatusTSX(status)


	useEffect(() => {
		getStatusOrg()
	}, [organization.guid])

	const getStatusOrg = async () => {
		try {
			const { data } = await RequestLocation.geStatusOrgAll(organization.guid)
			setStatus(data)
		} catch (error) {
			console.log(error);
		}
	}


	return (
		<>
			<div className="deliv-method">
			{
				tsx &&
				(
					tsx.OnliPICKUP() ? 'только самовывоз' :
						tsx.Delivery() ? 'самовывоз и доставка' :
							tsx.OpenPoint() ? 'скоро открытие' :
								tsx.NoWorkPoint() ? 'онлайн-заказ недоступен' :
									tsx.NoDeliveryPoint('') ? '' : ''
				)
			}
			</div>
			{
				status &&
				<button
					className="btn welcome__select-adress__btn"
					onClick={() => handler(organization,status)}
					disabled={status.organizationStatus === ORG_STATUS.OPEN || status.organizationStatus === ORG_STATUS.NOWORK && true}
				>
					Выбрать
				</button>
			}
			
		</>
	)
}
export default PopupPointStatus