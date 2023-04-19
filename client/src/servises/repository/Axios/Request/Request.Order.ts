import { ApiSuper, methods } from "../AxiosApi";

type IOrderNumber = {
  number:number
}
type IOrderUrl = {
  redirectUrl:string
}


class RequestOrder extends ApiSuper {
  @methods("get")
  OrderNumber(hash:string) {
      return this.request<IOrderNumber>(`/order/number/${hash}`);
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
export default new RequestOrder();
