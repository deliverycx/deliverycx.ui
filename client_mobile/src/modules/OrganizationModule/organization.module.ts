import { cityModel } from "modules/CityModule/city.module";
import { OrganizationModel } from "./Organization/domain/organization.model";
import { UseCaseOrganization } from "./Organization/useCase/organization.useCase";
import { OrganizationStatusModel } from "./OrganizationStatuses/domain/organizationStatus.model";
import { UseCaseOrganizationStatus } from "./OrganizationStatuses/useCase/organizationStatus.useCase";

export const organizationModel = new OrganizationModel()
export const organizationStatusModel = new OrganizationStatusModel()

export const useCaseOrganization = new UseCaseOrganization(
		organizationModel,
		cityModel
	)

export const useCaseOrganizationStatus = new UseCaseOrganizationStatus(
	organizationModel,
	organizationStatusModel
)