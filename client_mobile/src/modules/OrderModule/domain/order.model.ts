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
	timedelivery: ""
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
			expireIn: 86400000,
			removeOnExpiration: true,
		});
	}

	actionOrderBody(body: IInitialValues) {
		this.orderBody = body
	}
	actionOrderDeliveryAddress(body: IAddressDelivery) {
		this.orderDeliveryAddress = body
	}
	async actionOrderOnspotTable(pointid: string | null) {
		if (pointid) {
			const result = await this.repositoryONSpotTable(pointid)
			if (result) {
				this.orderOnspotTable = result

				return result
			}
		} else {
			this.orderOnspotTable = null
			return null
		}
	}

	actionSetOrderOnspotTable(onspotTable: IOrderOnspotTable) {
		this.orderOnspotTable = onspotTable
	}

	actionResetOrder() {
		this.orderOnspotTable = null
		this.orderBody = InitOrderBody
	}

}