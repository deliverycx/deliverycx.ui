import { DELIVERY_METODS, ORG_STATUS } from "application/contstans/const.orgstatus"
import { workTimeHelp, delivertyTime, workTimeCheck } from "application/helpers/workTime"
import { IPointStatusRequest, IWorkTimePoint, IDeliveryTypes } from "../interfaces/organizationStatus.type"
import { InjectableDI } from "application/helpers/dependencyInjection"


@InjectableDI()
export class OrganizationStatusServises{
	existingOrganizationStatus(pointStatus: IPointStatusRequest) {
		if (pointStatus.deliveryMetod.length !== 0 && pointStatus.paymentMetod.length !== 0) {
			return pointStatus
		} else {
			throw Error('no deliveryMetod and paymentMetod')

		}
	}

	timeWorkOrganizationEntiti(work: string[] | string,pointid?:string): IWorkTimePoint {
		let typework: "WORK" | "NOWORK" | "ONWORK"
		let todaytime: string[] = []

		const worktime = workTimeHelp(work,pointid)
		
		const onworktime = delivertyTime(work, 60,pointid)

		const today = workTimeCheck(work,pointid)
		if (today) {
			todaytime = today.split('-')
		}

		if (onworktime && !worktime) {
			typework = 'ONWORK'
		} else if (worktime) {
			typework = 'NOWORK'
		} else {
			typework = 'WORK'
		}

		return {
			typework,
			todaytime,
			timelist: work
		}
	}

	deliveryTypesMetod(types: string[]) {
		return types.map((value: string) => {
			switch (value) {
				case DELIVERY_METODS.COURIER:
					return {
						metod: value,
						name: "Доставка",
						//route: ROUTE_APP.ORDER.ORDER_COURIER,
						active: false,
						sort:1
					}

				case DELIVERY_METODS.PICKUP:
					return {
						metod: value,
						name: "Самовывоз",
						//route: ROUTE_APP.ORDER.ORDER_PICKUP,
						active: false,
						sort:2
					}
				case DELIVERY_METODS.ONSPOT:
					return {
						metod: value,
						name: "За столом",
						//route: ROUTE_APP.ORDER.ORDER_ONSPOT,
						active: false,
						sort:3
					}
				default:
					return {
						metod: DELIVERY_METODS.COURIER,
						name: "Доставка",
						//route: ROUTE_APP.ORDER.ORDER_COURIER,
						active: true
					}
			}
		})
	}

	changesDeliveryType(deliveryTypes: IDeliveryTypes[], deliveryTime: IWorkTimePoint,deliveryMetod?: IDeliveryTypes | null) {
		return deliveryTypes.map((types) => {
			
			// проверям что точка скоро закроется
			if (deliveryTime.typework === ORG_STATUS.ONWORK) {
				// подставляем что сейчас только самовывоз
				if (types.metod === DELIVERY_METODS.PICKUP) {
					return { ...types, active: true }
				}else{
					return types
				}
				
				// если точка закрылась неодного типа нету
			} else if (deliveryTime.typework === ORG_STATUS.NOWORK) {
				return { ...types, active: true }
			} else {
				// делаем активный выбранный тип при выборе точки
				if (deliveryMetod && types.metod === deliveryMetod.metod) {
					return { ...types, active: true }
				} else {
					return types
				}
			}


		})
	}
}