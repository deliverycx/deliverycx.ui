import { FC, useEffect, useState } from "react"
import RequestLocation from "servises/repository/Axios/Request/Request.Location"
import { IPointStatus } from '@types';
import { StatusTSX, useOrganizationStatus } from "application/hooks/useOrganizationStatus";
import { DELIVERY_METODS, ORG_STATUS } from "application/contstans/const.orgstatus";
import { IPoint } from '@types';
import cn from "classnames";

type IProps = {
	organization: IPoint
	handler?:any
	selectpoint?:IPoint
}

const PointStatus: FC<IProps> = ({ organization,selectpoint,handler }) => {
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

	const CN = cn("welcome__city", { active: organization.address === selectpoint?.address, disablepoint:status?.organizationStatus === ORG_STATUS.OPEN })

	return (
		<>
		<li className={CN} onClick={() => handler(organization,status)}>
			{organization.address}
			{
				tsx &&	
				(
					tsx.OnliPICKUP('только самовывоз') ? <span className="onlypickup_small">только самовывоз</span> :
					tsx.Delivery('самовывоз и доставка') ? <span className="onlypickup_small">самовывоз и доставка</span> : 
					tsx.PickupOnSPOT('самовывоз') ? <span className="onlypickup_small">самовывоз</span> :
					tsx.OpenPoint('скоро открытие') ? <span className="onlypickup_small">скоро открытие</span> :
					tsx.NoWorkPoint('онлайн-заказ недоступен') ? <span className="onlypickup_small">онлайн-заказ недоступен</span> :
					tsx.NoDeliveryPoint('') ? '' : ''
				)
			}
			</li>
		</>
	)
}
export default PointStatus