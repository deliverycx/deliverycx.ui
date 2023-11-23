import { action, makeObservable, observable } from "mobx"
import { IInitialValues, IOrderOnspotTable } from "../interfaces/order.type"
import { PAYMENT_METODS } from "application/contstans/const.orgstatus"
import { OrderRepository } from "../data/order.repository"
import { IAddressDelivery } from "modules/Profile/interfaces/profile.type"
import { makePersistable } from "mobx-persist-store"

const InitOrderBody = {
	address: '',
	comment: '',
	name: "",
	phone: "",
	payment: PAYMENT_METODS.CASH,
	money: 0,
	timedelivery: "",
	devices:0
}
export class OrderModel extends OrderRepository {
	orderBody: IInitialValues = InitOrderBody
	orderOnspotTable: IOrderOnspotTable | null = null
	orderDeliveryAddress: IAddressDelivery | null = null

	constructor() {
		super()
		makeObservable(this, {
			orderBody: observable,
			orderDeliveryAddress: observable,
			orderOnspotTable: observable,
			actionOrderBody: action,
			actionOrderOnspotTable: action,
			actionSetOrderOnspotTable: action,
			actionResetOrder: action,
			actionOrderDeliveryAddress: action
		})
		makePersistable(this, {
			name: 'order',
			properties: ['orderBody', 'orderDeliveryAddress'],
			storage: window.localStorage,
			expireIn: 8640000,
			removeOnExpiration: true,
		});
	}

	actionOrderBody(body: IInitialValues) {
		this.orderBody = body
	}
	actionOrderDeliveryAddress(body: IAddressDelivery) {
		this.orderDeliveryAddress = body
	}
	async actionOrderOnspotTable(pointid: string | null,qr:any) {
		if (pointid) {
			const result = await this.repositoryONSpotTable(pointid)
			
			if (result) {
				const tableSection = this.checkOrderTable(result,qr)
				
				if(tableSection){
					
					this.orderOnspotTable = tableSection
				}
				

				return result
			}
		} else {
			this.orderOnspotTable = null
			return null
		}

		
	}

	actionSetOrderOnspotTable(onspotTable: IOrderOnspotTable | null) {
		this.orderOnspotTable = onspotTable
	}

	actionResetOrder() {
		this.orderOnspotTable = null
		this.orderBody = InitOrderBody
		this.orderDeliveryAddress = null
	}

}