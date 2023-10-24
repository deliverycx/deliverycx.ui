import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { ShopModel } from "../domain/shop.model";
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';

export class ShopUseCase{
	constructor(
		public readonly shopModel:ShopModel,
		public readonly organizationModel:OrganizationModel
	){}

	async getNomenclature(pointid:string | undefined){
		return pointid && await this.shopModel.reposityNomenclature(pointid)
	}

	caseSelectProduct(products:IProduct[],catid:string){
		
		if(catid && this.organizationModel.selectOrganization){
			const resultProduct = this.shopModel.filterProductsBuCategory(products,catid)
			return resultProduct
		}
	}

	async additionProducts(){
		if(this.organizationModel.selectOrganization){
			return await this.shopModel.reposityAdditionProducts(this.organizationModel.selectOrganization.guid)
		}
		
	}

	async getStopList(){
		if(this.organizationModel.selectOrganization){
			this.shopModel.actionSelectProduct(this.organizationModel.selectOrganization.guid)
		}
		
	}
}