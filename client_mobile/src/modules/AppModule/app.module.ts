import { basketModel } from "modules/BasketModule/basket.module";
import { orderModel } from "modules/OrderModule/order.module";
import { organizationModel, organizationStatusModel } from "modules/OrganizationModule/organization.module";
import { AppUseCase } from "./useCase/app.useCase";
import { shopModel } from "modules/ShopModule/shop.module";


export const appUseCase = new AppUseCase(
	organizationModel,
	organizationStatusModel,
	shopModel,
	basketModel,
	orderModel
)