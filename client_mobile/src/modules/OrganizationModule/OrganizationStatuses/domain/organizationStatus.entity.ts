import { DELIVERY_METODS } from "application/contstans/const.orgstatus";
import { IDeliveryTypes, IPointStatusRequest } from "../interfaces/organizationStatus.type";
import { ROUTE_APP } from 'application/contstans/route.const';

export class OrganizationStatusEntiti {

	existingOrganizationStatus(pointStatus: IPointStatusRequest) {
		if (pointStatus.deliveryMetod.length !== 0 && pointStatus.paymentMetod.length !== 0) {
			return pointStatus
		} else {
			throw Error('no deliveryMetod and paymentMetod')

		}
	}

	deliveryTypesMetod(types: string[]) {
		return types.map((value: string) => {
			switch (value) {
				case DELIVERY_METODS.COURIER:
					return {
						metod: value,
						name: "Доставка",
						route: ROUTE_APP.ORDER.ORDER_COURIER,
						active: false
					}

				case DELIVERY_METODS.PICKUP:
					return {
						metod: value,
						name: "Самовывоз",
						route: ROUTE_APP.ORDER.ORDER_PICKUP,
						active: false
					}
				case DELIVERY_METODS.ONSPOT:
					return {
						metod: value,
						name: "За столом",
						route: ROUTE_APP.ORDER.ORDER_ONSPOT,
						active: false
					}
				default:
					return {
						metod: DELIVERY_METODS.COURIER,
						name: "Доставка",
						route: ROUTE_APP.ORDER.ORDER_COURIER,
						active: true
					}	
			}
		})
	}
}