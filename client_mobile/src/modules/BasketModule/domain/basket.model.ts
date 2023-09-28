import { action, makeObservable, observable } from "mobx";
import { BasketRepository } from "../data/basket.repository";
import { IBasketPrice, ICartProd, IaddBasket } from "../interfaces/basket.type";
import { IProduct } from "modules/ShopModule/interfaces/shop.type";
import { makePersistable } from "mobx-persist-store";

export class BasketModel extends BasketRepository{
	cart:ICartProd[] | null = null
	basketPrice:IBasketPrice | null = null

	constructor() {
		super()
		makeObservable(this, {
			cart: observable,
			basketPrice: observable,
			actionGetBasket:action,
		})
		//makePersistable(this, { name: 'basket', properties: ['cart'],storage: window.localStorage });
	}

	async actionGetBasket(body:any){
		const result = await this.repositorygetBasket(body)
		if(result){
			this.cart = result.cart
			this.basketPrice = result.basketPrice
			return result
		}
		
	}

}