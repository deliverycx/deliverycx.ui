import { ShopModel } from "../domain/shop.model";

export class ShopUseCase{
	constructor(
		public readonly shopModel:ShopModel
	){}

	async getNomenclature(pointid:string | undefined){
		return pointid && await this.shopModel.reposityNomenclature(pointid)
	}
}