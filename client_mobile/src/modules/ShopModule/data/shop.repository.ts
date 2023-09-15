import { guardRepository } from "application/guards/repository.guard";
import { ShopEntiti } from "../domain/shop.entity";
import { requestShopApi } from "./shop.request";
import { ShopMapper } from "../interfaces/shop.dto";
import { IRequestNomeclature } from "../interfaces/shop.type";

export class ShopRepository extends ShopEntiti{

	async reposityNomenclature(pointid:string){
		const {data} = await requestShopApi.getNomenclature(pointid) 
		const result = guardRepository(this.existingNomenclature)(data)
		return result && ShopMapper(result as unknown as IRequestNomeclature)
	}
}