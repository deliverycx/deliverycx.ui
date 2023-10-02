import { action, makeObservable, observable } from "mobx"
import { IInitialValues } from "../interfaces/order.type"
import { PAYMENT_METODS } from "application/contstans/const.orgstatus"


export class OrderModel{
	orderBody:IInitialValues = {
		address: '',
		house: "",
		kladrid: '',
		comment: "",
		flat: "",
		intercom: "",
		entrance: "",
		floor: "",
		name: "",
		phone: "",
		payment: PAYMENT_METODS.CASH,
		money:0,
		timedelivery:''
	}

	constructor() {

		makeObservable(this, {
			orderBody: observable,
			actionOrderBody:action,
		})
		//makePersistable(this, { name: 'basket', properties: ['cart'],storage: window.localStorage });
	}

	actionOrderBody(body:IInitialValues){
		this.orderBody = body
	}

}