import { action, makeObservable, observable } from "mobx"
import { IInitialValues, IOrderOnspotTable } from "../interfaces/order.type"
import { PAYMENT_METODS } from "application/contstans/const.orgstatus"
import { OrderRepository } from "../data/order.repository"


export class OrderModel extends OrderRepository{
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
		timedelivery:""
	}
	orderOnspotTable:IOrderOnspotTable | null = null

	constructor() {
		super()
		makeObservable(this, {
			orderBody: observable,
			orderOnspotTable:observable,
			actionOrderBody:action,
			actionOrderOnspotTable:action,
			actionSetOrderOnspotTable:action
		})
		//makePersistable(this, { name: 'basket', properties: ['cart'],storage: window.localStorage });
	}

	actionOrderBody(body:IInitialValues){
		this.orderBody = body
	}
	async actionOrderOnspotTable(pointid:string | null){	
		if(pointid){
			const result = await this.repositoryONSpotTable(pointid)
			if(result){
				this.orderOnspotTable = result
				
				return result
			}
		}else{
			this.orderOnspotTable = null
			return null
		}
	}

	actionSetOrderOnspotTable(onspotTable:IOrderOnspotTable){
		this.orderOnspotTable = onspotTable
	}

}