import { organizationModel, organizationStatusModel } from "modules/OrganizationModule/organization.module";
import { BasketModel } from "./domain/basket.model";
import { BasketUseCase } from "./useCase/basket.useCase";
import { userModel } from "modules/UserModule/user.module";

export const basketModel = new BasketModel()

export const basketUseCase = new BasketUseCase(
	basketModel,
	organizationModel,
	organizationStatusModel,
	userModel
)