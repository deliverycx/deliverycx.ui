import { catchError, debounce, interval, map, of } from "rxjs";
import { IRequestBasket, IaddBasket } from "../interfaces/basket.type";
import { requestBasket } from "./basket.request";
import { guardPiPeRepository, guardRepository } from "application/guards/repository.guard";
import { BasketEntity } from "../domain/basket.entity";
import { basketMapper } from "../interfaces/basket.dto";

export class BasketRepository extends BasketEntity {

	async repositorygetBasket(body: any) {
		try {
			const { data } = await requestBasket.allCart(body)
			const result = guardRepository(this.existingBasket)(data)
			if (result) {
				return basketMapper(result as IRequestBasket)
			}
		} catch (error) {
			console.log(error);
		}
	}

	async repositoryAddToCart(body: any) {
		const { data } = await requestBasket.addToCart(body)
		if (data) {
			return data
		}
	}

	async repositoryChangeAmountCart(body:any){
		const { data } = await requestBasket.changeAmount(body)
		if (data) {
			return data
		}
	}

	async repositoryRemoveOneCart(body:any){
		const { data } = await requestBasket.removeCart(body)
		if (data) {
			return data
		}
	}

	async repositoryDeliteCart(){
		const { data } = await requestBasket.deleteCart()
		if (data) {
			return data
		}
	}

	async repositoryCheckCart(){
		const { data } = await requestBasket.checkCart()
		if (data) {
			return data
		}
	}



}