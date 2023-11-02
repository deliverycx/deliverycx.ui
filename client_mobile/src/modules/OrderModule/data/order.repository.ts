import { OrderEntity } from "../domain/order.entity";
import { requestOrder } from "./order.request"

export class OrderRepository extends OrderEntity{
	async repositoryONSpotTable(pointid:string){
		const { data } = await requestOrder.orgTables(pointid)
		return data
	}
}
