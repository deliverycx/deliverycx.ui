import { orderCreateRequest } from "./orderCreate.request";

export class OrderCreateRepository {
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
}
export const orderCreateRepository = new OrderCreateRepository()