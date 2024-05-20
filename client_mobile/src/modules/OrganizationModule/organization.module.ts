import { cityModel } from "modules/CityModule/city.module";
import { OrganizationModel } from "./Organization/domain/organization.model";
import { UseCaseOrganization } from "./Organization/useCase/organization.useCase";
import { OrganizationStatusModel } from "./OrganizationStatuses/domain/organizationStatus.model";
import { UseCaseOrganizationStatus } from "./OrganizationStatuses/useCase/organizationStatus.useCase";
import { OrganizationComandBus } from "./Organization/comands/organization.comandBus";
import { adapterResolveDI } from "application/helpers/dependencyInjection";
import { OrganizationHandlers } from "./Organization/comands/organization.handlers";
import { OrganizationQuery } from "./Organization/comands/organization.query";
import { OrganizationStatusComandBus } from "./OrganizationStatuses/comands/OrganizationStatus.comandBus";
import { OrganizationStatusQuery } from "./OrganizationStatuses/comands/OrganizationStatus.query";
import { OrganizationStatusHandlers } from "./OrganizationStatuses/comands/OrganizationStatus.handlers";




export const organizationComandBus = new OrganizationComandBus()
export const organizationStatusComandBus = new OrganizationStatusComandBus()


class OrganizationModule{
	queryBus:OrganizationQuery = adapterResolveDI(OrganizationQuery)
	handlerBus:OrganizationHandlers = adapterResolveDI(OrganizationHandlers)
	organizationModel:OrganizationModel = adapterResolveDI(OrganizationModel)
}
export const organizationModule = new OrganizationModule()
export const {organizationModel} = organizationModule

class OrganizationStatusModule{
	queryBus:OrganizationStatusQuery = adapterResolveDI(OrganizationStatusQuery)
	handlerBus:OrganizationStatusHandlers = adapterResolveDI(OrganizationStatusHandlers)
	useCaseOrganizationStatus:UseCaseOrganizationStatus = adapterResolveDI(UseCaseOrganizationStatus)
	organizationStatusModel:OrganizationStatusModel = adapterResolveDI(OrganizationStatusModel)
}
export const organizationStatusModule = new OrganizationStatusModule()
export const {
	useCaseOrganizationStatus,
	organizationStatusModel
} = organizationStatusModule