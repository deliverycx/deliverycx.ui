import { DELIVERY_METODS } from "application/contstans/const.orgstatus";
import { IDeliveryTypes, IPointStatusRequest, IWorkTimePoint } from "../interfaces/organizationStatus.type";
import { ROUTE_APP } from 'application/contstans/route.const';
import { delivertyTime, workTimeCheck, workTimeHelp } from "application/helpers/workTime";


export class OrganizationStatusEntiti {

	existingOrganizationStatus(pointStatus: IPointStatusRequest) {
		if (pointStatus.deliveryMetod.length !== 0 && pointStatus.paymentMetod.length !== 0) {
			return pointStatus
		} else {
			throw Error('no deliveryMetod and paymentMetod')

		}
	}

	timeWorkOrganizationEntiti(work:string[] | string):IWorkTimePoint {
		let typework:"WORK" | "NOWORK" | "ONWORK"
		let todaytime:string[] = []

		const worktime = workTimeHelp(work)
		const onworktime = delivertyTime(work,60)

		const today = workTimeCheck(work)
		if(today){
			todaytime = today.split('-')
		}

		if(onworktime && !worktime){
			typework = 'ONWORK'
		}else if(worktime){
			typework = 'NOWORK'
		}else{
			typework = 'WORK'
		}

		return{
			typework,
			todaytime,
			timelist:work
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