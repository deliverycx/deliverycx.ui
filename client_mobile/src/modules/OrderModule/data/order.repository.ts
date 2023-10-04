import { OrderEntity } from "../domain/order.entity";
import { requestOrder } from "./order.request"

export class OrderRepository extends OrderEntity{
	async repositoryONSpotTable(pointid:string){
		const { data } = await requestOrder.orgTables(pointid)
		if (data) {
			return this.checkOrderTable(data)
		}else{
			return null
		}
	}
}