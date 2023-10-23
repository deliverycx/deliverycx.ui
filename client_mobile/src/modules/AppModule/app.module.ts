import { basketModel, basketUseCase } from "modules/BasketModule/basket.module";
import { orderModel } from "modules/OrderModule/order.module";
import { organizationModel, organizationStatusModel } from "modules/OrganizationModule/organization.module";
import { AppUseCase } from "./useCase/app.useCase";
import { shopModel } from "modules/ShopModule/shop.module";
import { AppModel } from "./domain/app.model";

export const appModel = new AppModel()

export const appUseCase = new AppUseCase(
	appModel,
	organizationModel,
	organizationStatusModel,
	shopModel,
	basketUseCase,
	orderModel
)