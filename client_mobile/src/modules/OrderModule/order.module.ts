import { organizationModel, organizationStatusModel } from "modules/OrganizationModule/organization.module";
import { OrderModel } from "./domain/order.model";
import { OrderUseCase } from "./useCase/order.useCase";
import { OrderCreateUseCase } from "./useCase/orderCreate.useCase";
import { basketModel } from "modules/BasketModule/basket.module";


export const orderModel = new OrderModel()

export const orderUseCase = new OrderUseCase(
	orderModel,
	organizationModel,
	organizationStatusModel
)


export const orderCreateUseCase = new OrderCreateUseCase(
	orderModel,
	organizationModel,
	organizationStatusModel,
	basketModel
)