/* eslint-disable @typescript-eslint/no-namespace */
import { ICart, IReqCart } from "@types";
import encodeQueryData from "application/helpers/encodeQuery";
import { string } from "yup";
import { ApiSuper, methods, token } from "../AxiosApi";
import { IProduct } from '@types';

// получаем
namespace ReqCart {
    type Responses = {
        totalPrice: number;
        deltaPrice: number;
        deliveryPrice: number;
    };

    export type getAll = {
        cart: IReqCart[];
    } & Responses;

    export type add = {
        item: IReqCart;
    } & Responses;

    export type amount = {
        item: IReqCart;
    } & Responses;

    export type removeOne = {
        deletedId: string;
    } & Responses;

    export type orderCreate = {
      redirectUrl: string;
    };
}
// передаем
namespace ResCart {
    export type orderType = {
        orderType:string
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

class RequestCart extends ApiSuper {
    @methods("get")
    allCart(query: ResCart.orderType) {
        return this.request<ReqCart.getAll>("/cart/getAll?" + encodeQueryData(query));
    }
    @methods("post")
    addToCart(body: ResCart.add) {
        return this.request<ReqCart.add>("/cart/add");
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
    deleteCart() {
        return this.request<[]>("/cart/deleteAll");
    }
    @methods("post")
    OrderCheckCart(body: any) {
        return this.request<any>("/order/check");
    }
    @methods("post")
    OrderCart(body: any) {
        return this.request<ReqCart.orderCreate>("/order/create");
    }

		@methods("get")
    orgTables(query: any) {
        return this.request<any>(`/cart/organizationtables?id=${query}`);
    }
}
export default new RequestCart();
