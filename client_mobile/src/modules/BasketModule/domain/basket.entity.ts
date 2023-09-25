import { IBasket, ICartProd, IRequestBasket } from "../interfaces/basket.type";

export class BasketEntity{
	existingBasket(basket:IRequestBasket){
		if(basket && basket.cart.length !== 0){
			return basket
		}
		return false
	}


	findIndexCart(productid:string,cart:ICartProd[]){
		const result = cart.find((el)=>{
			return el.productId === productid
		})
		return result && {
			id:result.id,
			anmout:result.amount
		}
	}	
}