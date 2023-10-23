import { BasketModel } from "modules/BasketModule/domain/basket.model";
import { OrderModel } from "modules/OrderModule/domain/order.model";
import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model";
import { ShopModel } from "modules/ShopModule/domain/shop.model";
import { AppModel } from "../domain/app.model";
import { basketUseCase } from "modules/BasketModule/basket.module";
import { BasketUseCase } from "modules/BasketModule/useCase/basket.useCase";

export class AppUseCase{
	constructor(
		public readonly appModel:AppModel,
		public readonly organizationModel:OrganizationModel,
		public readonly	organizationStatusModel:OrganizationStatusModel,
		public readonly shopModel:ShopModel,
		public readonly basketUseCase:BasketUseCase,
		public readonly orderModel:OrderModel,
	){}

	clearApp(){
		this.organizationModel.actionSelectOrganization(null)
		this.organizationStatusModel.actionSelectDeliveryTipe(null)
		this.shopModel.actionSelectCategory(null)
		this.basketUseCase.resetCart()
		this.orderModel.actionResetOrder()

	}

	authNotificate(val:boolean){
		this.appModel.actionAuthNotificate(val)
	}
}