import { ApiSuper, methods } from "servises/Axios/AxiosApi"

type IOrderNumber = {
  number:number
}
type IOrderHash = {
  number:string
}
type IOrderUrl = {
  redirectUrl:string
}


export class OrderCreateRequest extends ApiSuper{
	@methods("post")
  OrderCreate(body:any) {
      return this.request<IOrderUrl>(`/order/createOrderMicro`);
  }

	@methods("post")
  OrderCreatePayment(body:any) {
      return this.request<IOrderUrl>(`/order/createPaymentOrder`);
  }
	@methods("post")
  CreatePayment(body:any) {
      return this.request<IOrderUrl>(`/webhook/paymentCreate`);
  }
	@methods("post")
	OrderCheck(body: any) {
			return this.request<any>("/order/check");
	}
  @methods("get")
  OrderNumber(hash:string) {
      return this.request<IOrderNumber>(`/order/number/${hash}`);
  }

	@methods("get")
  getOrderHashRedis(hash:string) {
      return this.request<string>(`/order/gethash/${hash}`);
  }

	@methods("get")
  getOrder(hash:string) {
      return this.request<any>(`/order/getorder/${hash}`);
  }

	@methods("get")
  dualPayment(hash:string) {
      return this.request<IOrderNumber>(`/webhook/dualPayment/${hash}`);
  }

	@methods("post")
  dualPaymentCreate(body:any) {
      return this.request<IOrderUrl>(`/webhook/dualPaymentCreate`);
  }
}
export const orderCreateRequest = new OrderCreateRequest()




