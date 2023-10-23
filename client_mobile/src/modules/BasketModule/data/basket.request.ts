/* eslint-disable @typescript-eslint/no-namespace */
import encodeQueryData from "application/helpers/encodeQuery";
import { IProduct } from "modules/ShopModule/interfaces/shop.type";
import { ApiSuper, methods } from "servises/Axios/AxiosApi";
import { AjaxApiSuper } from "servises/rxjs/AjaxApi";

// получаем
namespace ReqCart {
	type Responses = {
		totalPrice: number;
		deltaPrice: number;
		deliveryPrice: number;
	};

	export type getAll = {
		cart: IProduct[];
	} & Responses;

	export type add = {
		item: IProduct;
	} & Responses;

	export type amount = {
		item: IProduct;
	} & Responses;

	export type removeOne = {
		deletedId: string;
	} & Responses;

	export type orderCreate = {
		redirectUrl: string;
	};
}
// передаем
export namespace ResCart {
	export type orderType = {
		orderType: string
	}
	export type add = {
		product: IProduct;
	} & orderType;
	export type amount = {
		amount: number;
		cartId: string;
	} & orderType;
	export type removeOne = {
		cartId: string;
	} & orderType;
}
class RequestBasket extends ApiSuper {
	@methods("get")
	allCart(query: ResCart.orderType) {
		return this.request<ReqCart.getAll>("/cart/getAll?" + encodeQueryData(query));
	}
	@methods("post")
	addToCart(body: ResCart.add) {
		return this.request<ReqCart.add>("cart/add");
	}
	@methods("post")
	changeAmount(body: ResCart.amount) {
		return this.request<ReqCart.amount>("/cart/amount");
	}
	@methods("delete")
	removeCart(body: ResCart.removeOne) {
		return this.request<ReqCart.removeOne>("/cart/removeOne");
	}
	@methods("delete")
	deleteCart(body:any) {
		console.log('qqqqqqq');
		return this.request<[]>("/cart/deleteAll");
	}
	@methods("post")
	checkCart(body:any) {
		return this.request<ReqCart.add>("order/checkcart");
	}

}

export const requestBasket = new RequestBasket()