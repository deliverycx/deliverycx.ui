import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import {BasketDTO} from './basket.dto'

export type IRequestBasket  = {
	cart:ICartProd[]
	deliveryPrice: number;
  deltaPrice: number;
	totalPrice:number;
	fullPrice:number
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

export interface ICartAdditonalSous {
	sousid:string
	parentid:string
	count:number
	amount:number
}

export type IbodyReqCart = { orderType: string, organization: string }


export interface IBasketPrice {
	deliveryPrice: number;
  deltaPrice: number;
	totalPrice:number;
	fullPrice:number
}

export type IaddBasket = {
	orderType:string | undefined
	organization:string | undefined
	product:IProduct
}

export type IBasketError = {
	HI:{
		message:string
	}
}

export type IBasket = BasketDTO