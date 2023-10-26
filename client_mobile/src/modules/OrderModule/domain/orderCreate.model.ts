import { action, makeObservable, observable } from "mobx"
import { OrderCreateRepository } from "../data/orderCreate.repository"

export class OrderCreateModel extends OrderCreateRepository{
	orderNumber:number | null = null
	orderCreateError:any = null

	constructor(){
		super()
		makeObservable(this, {
			orderNumber: observable,
			orderCreateError:observable,
			actionSetOrderNumber: action,
		})
	}

	actionSetOrderNumber(ordernumber:number){
		this.orderNumber = ordernumber
	}
}