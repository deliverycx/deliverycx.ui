import { guardRepository } from "application/guards/repository.guard";
import { ShopEntiti } from "../domain/shop.entity";
import { requestShopAjax, requestShopApi } from "./shop.request";
import { ShopMapper } from "../interfaces/shop.dto";
import { IRequestNomeclature } from "../interfaces/shop.type";
import { catchError, map, of } from "rxjs";

export class ShopRepository extends ShopEntiti {

	async reposityNomenclature(pointid: string) {
		try {
			if(pointid){
				const { data } = await requestShopApi.getNomenclature(pointid)
				const result = guardRepository(this.existingNomenclature)(data)
				return result && ShopMapper(result as unknown as IRequestNomeclature)
			}else{
				return null
			}
			
		} catch (error) {
			console.log(error);
		}

	}

	async reposityAdditionProducts(pointid: string) {
		try {
			const { data } = await requestShopApi.getAdditionProducts(pointid)
			if(data){
				return data
			}
		} catch (error) {
			console.log(error);
		}
		
		
	}

	async repositySousProducts(pointid: string) {
		try {
			const { data } = await requestShopApi.getSosusProducts(pointid)
			if(data){
				return data
			}
		} catch (error) {
			console.log(error);
		}
		
		
	}

	reposityStoplist(pointid: string) {
		return requestShopAjax.stoplist(pointid)
			.pipe(
				map(response => response.response),
				catchError(error => {
					console.log('error: ', error);
					return of(error);
				})
			)
	}
}
export const shopRepository = new ShopRepository()