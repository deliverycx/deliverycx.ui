import { action, makeObservable, observable } from "mobx";
import { BasketRepository } from "../data/basket.repository";
import { IBasketError, IBasketPrice, ICartAdditonalSous, ICartProd, IaddBasket } from "../interfaces/basket.type";
import { IProduct } from "modules/ShopModule/interfaces/shop.type";
import { makePersistable } from "mobx-persist-store";

export class BasketModel extends BasketRepository{
	cart:ICartProd[] | null = null
	basketPrice:IBasketPrice | null = null
	basketError:IBasketError | null = null
	cartAddional:ICartAdditonalSous[] = []

	constructor() {
		super()
		makeObservable(this, {
			cart: observable,
			basketPrice: observable,
			basketError:observable,
			actionGetBasket:action,
			actionCheckbasketError:action
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

	async actionCheckbasketError(error:any){
		this.basketError = error
	}

	cartAddionalSous(prodSous:ICartAdditonalSous){
		this.cartAddional.push(prodSous)
	}
	cartAddionalDeleteSous(prodSousid:string,parent:string){
		const indexToRemove = this.cartAddional.findIndex(item => item.sousid === prodSousid && item.parentid === parent);
		if (indexToRemove !== -1) {
			this.cartAddional.splice(indexToRemove, 1);
		}
	}
	cartAddionalSousChange(prodSousid:string,parent:string,count:number){
		const updatedcartAddional = this.cartAddional.map(item => {
			if (item.sousid === prodSousid && item.parentid === parent) {
					return { ...item, count: count}
			}
			return item;
		});
		this.cartAddional = updatedcartAddional
	}

}