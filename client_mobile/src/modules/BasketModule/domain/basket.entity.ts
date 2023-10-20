import { IBasket, ICartProd, IRequestBasket } from "../interfaces/basket.type";

export class BasketEntity{
	existingBasket(basket:IRequestBasket){
		if(basket){
			return basket
		}
		return false
	}


	findIndexCart(productid:string,cart:ICartProd[]){
		const result = cart.find((el)=>{
			return el.productId === productid
		})
		//console.log(result);
		return result && {
			id:result.id,
			productId:result.productId,
			anmout:result.amount,
			name:result.productName
		}
	}	
}