import { OrderCreateEntity } from "../domain/orderCreate.entity";
import { orderCreateRequest } from "./orderCreate.request";

export class OrderCreateRepository extends OrderCreateEntity {
	async repositoryCheckOrder(body: any) {
		try {
			const { data } = await orderCreateRequest.OrderCheck(body)
			if (data && typeof data === 'string') {
				return data
			}
		} catch (error) {
			console.log(error)
			return error;
		}


	}

	async repositoryOrderHasRedis(orderhash:string){
		try {
			const {data} = await orderCreateRequest.getOrderHashRedis(orderhash)

			if(data && data === orderhash){
				const orderNumb = await this.repositoryGetOrder(orderhash)
				return orderNumb
			}
		} catch (error) {
			console.log(error);
		}
	}

	async repositoryGetOrder(orderhash:string){
		try {
			const {data} = await orderCreateRequest.getOrder(orderhash)
			return data
		} catch (error) {
			console.log(error);
		}
	}

	async repositoryCreateOrder(orderBody:any,pay = false){
		try {
			if(pay){
				const {data} = await orderCreateRequest.OrderCreatePayment(orderBody)
				return data
			}else{
				await orderCreateRequest.OrderCreate(orderBody)
			}
		} catch (error) {
			console.log(error);
		}
		
	}

}
export const orderCreateRepository = new OrderCreateRepository()