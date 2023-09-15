import { IRequestNomeclature } from "../interfaces/shop.type";

export class ShopEntiti {
	existingNomenclature(nomeclature:IRequestNomeclature){
		if(nomeclature.categoryes && nomeclature.products){
			return nomeclature
		}
		return false
	}
}