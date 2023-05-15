import { IProduct } from "@types";

export interface ICart {
		orderInfo:IInitialValues
    totalPrice: number;
    address: string;
		kladrid:string
		cordAddress:[number,number]
    orderError: ICheckoutError;
    orderNumber: ICheckout;
    orderType:string;
		loadingDiscount:boolean;
		orderPrice:IOrderPrice
		orderTable:{
			id:string
			numb:number
			section:string
		}
}

export interface IOrderPrice {
	deliveryPrice: number;
  deltaPrice: number;
	totalPrice:number;
}

export interface ICheckout {
    number: number;
}
export interface ICheckoutError {
    error: string;
    status: number;
}
export interface IInitialValues {
    comment: string;
    name: string;
    phone: string;
    address: string;
		house:string;
    flat: string;
    intercom: string;
    entrance: string;
    floor: string;
		kladrid:string
}
export interface ISubmitData extends IInitialValues {
    payment: any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    times: object;
    city: string;
}
export interface IReqCart {
    id: string;
    productName: string;
    productImage: string;
    productTags: string[];
    productId: string;
    amount: number;
    price: number;
		oneprice:number;
}
