import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model";
import { OrderModel } from "../domain/order.model";
import { OrderCreateEntity } from "../domain/orderCreate.entity";
import { BasketModel } from "modules/BasketModule/domain/basket.model";
import { orderCreateRepository } from "../data/orderCreate.repository";

export class  OrderCreateUseCase extends OrderCreateEntity{
	constructor(
		public readonly orderModel:OrderModel,
		public readonly organizationModel:OrganizationModel,
		public readonly organizationStatusModel:OrganizationStatusModel,
		public readonly basketModel:BasketModel
		){
			super()
		}
		
	createOrderFabric(hash?:string){
		
		if(this.orderModel.orderDeliveryAddress){
			this.prepareAddress(this.orderModel.orderDeliveryAddress)
		} 
		if(this.orderModel.orderBody){
			this.bodyOrder(this.orderModel.orderBody)
		}
		if(this.organizationModel.selectOrganization){
			this.defaultBody(hash,this.organizationModel.selectOrganization)
		}
		if(
			this.organizationStatusModel.selectDeliveryTipe &&
			this.orderModel.orderOnspotTable &&
			this.basketModel.basketPrice
			){
				this.metodsOrder(
					this.organizationStatusModel.selectDeliveryTipe,
					this.orderModel.orderOnspotTable,
					this.basketModel.basketPrice
				)
			}
			
			return this.orderStates
	}

	async orderCheck(){
		const body = this.createOrderFabric()
		const url = await orderCreateRepository.repositoryCheckOrder(body)
		return url
	}
}