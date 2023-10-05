import { BasketModel } from "modules/BasketModule/domain/basket.model";
import { OrderModel } from "modules/OrderModule/domain/order.model";
import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model";
import { ShopModel } from "modules/ShopModule/domain/shop.model";

export class AppUseCase{
	constructor(
		public readonly organizationModel:OrganizationModel,
		public readonly	organizationStatusModel:OrganizationStatusModel,
		public readonly shopModel:ShopModel,
		public readonly basketModel:BasketModel,
		public readonly orderModel:OrderModel,
	){}

	clearApp(){
		this.organizationModel.actionSelectOrganization(null)
		this.organizationStatusModel.actionSelectDeliveryTipe(null)
		this.shopModel.actionSelectCategory(null)
		this.basketModel.actionCheckbasketError(null)
		//this.orderModel.actionResetOrder()
	}
}