import { adapterResolveDI } from "application/helpers/dependencyInjection";
import { OrganizationModel } from "./application/store/organization.model";


export const organizationsModel: OrganizationModel = adapterResolveDI(OrganizationModel);