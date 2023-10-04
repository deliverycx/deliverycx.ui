import { organizationModel, organizationStatusModel } from "modules/OrganizationModule/organization.module";
import { OrderModel } from "./domain/order.model";
import { OrderUseCase } from "./useCase/order.useCase";


export const orderModel = new OrderModel()

export const orderUseCase = new OrderUseCase(
	orderModel,
	organizationModel,
	organizationStatusModel
)