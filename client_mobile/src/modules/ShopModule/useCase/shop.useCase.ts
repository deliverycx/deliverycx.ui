import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { ShopModel } from "../domain/shop.model";
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import { isDesctomMediaQuery } from "application/ResponseMedia";

export class ShopUseCase{
	constructor(
		public readonly shopModel:ShopModel,
		public readonly organizationModel:OrganizationModel
	){}

	async getNomenclature(pointid:string | undefined){
		return pointid && await this.shopModel.reposityNomenclature(pointid)
	}

	async caseSelectProduct(products:IProduct[],catid:string,defPoint?:string | null){
		
		if(catid && this.organizationModel.selectOrganization){
			const resultProduct = this.shopModel.filterProductsBuCategory(products,catid)
			const result = await this.hiddenProducts(resultProduct,this.organizationModel.selectOrganization.guid)
			this.shopModel.actionSelectProduct(this.organizationModel.selectOrganization.guid,result)
			return result
		}else{
			if(catid && typeof defPoint === 'string'){
				const resultProduct = this.shopModel.filterProductsBuCategory(products,catid)
				const result = await this.hiddenProducts(resultProduct,defPoint)
				this.shopModel.actionSelectProduct(defPoint,result)
				return result
			}
		}
	}

	async additionProducts(){
		if(this.organizationModel.selectOrganization){
			return await this.shopModel.reposityAdditionProducts(this.organizationModel.selectOrganization.guid)
		}
		
	}

	async hiddenProducts(products:IProduct[],pointid:string){
		try {
			const hidden = await this.shopModel.reposityHiddenProducts(pointid)
			
			if(hidden && hidden.hiddenProduct.length !== 0){
				return this.shopModel.filterHiddenProducts(products,hidden.hiddenProduct)
			}else{
				return products
			}
		} catch (error) {
			return products
		}
	}

	async sousesProducts(){
		if(this.organizationModel.selectOrganization){
			return await this.shopModel.repositySousProducts(this.organizationModel.selectOrganization.guid)
		}
		
	}

	async getStopList(){
		if(this.organizationModel.selectOrganization){
			this.shopModel.actionStopList(this.organizationModel.selectOrganization.guid)
		}
		
	}
}