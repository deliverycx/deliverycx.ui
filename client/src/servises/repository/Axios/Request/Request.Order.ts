import { ApiSuper, methods } from "../AxiosApi";

type IOrderNumber = {
  number:number
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
  
}
export default new RequestOrder();
