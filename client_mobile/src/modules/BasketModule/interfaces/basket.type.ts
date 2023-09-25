import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import {BasketDTO} from './basket.dto'

export type IRequestBasket  = {
	cart:ICartProd[]
	deliveryPrice: number;
  deltaPrice: number;
	totalPrice:number;
}

export interface ICartProd {
	id: string;
	productName: string;
	productImage: string;
	productTags: string[];
	productId: string;
	amount: number;
	price: number;
	oneprice:number;
}

export type IbodyReqCart = { orderType: string, organization: string }


export interface IBasketPrice {
	deliveryPrice: number;
  deltaPrice: number;
	totalPrice:number;
}

export type IaddBasket = {
	orderType:string | undefined
	organization:string | undefined
	product:IProduct
}

export type IBasket = BasketDTO