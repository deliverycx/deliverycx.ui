import { InjectableDI } from "application/helpers/dependencyInjection";
import { OrganizationStatusRepository } from "../data/organizationStatus.repository";
import { UseCaseOrganizationStatus } from "../useCase/organizationStatus.useCase";
import { organizationStatusComandBus } from "modules/OrganizationModule/organization.module";
import { IPointStatus } from "../interfaces/organizationStatus.type";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { startWith } from "rxjs/operators";

@InjectableDI([OrganizationStatusRepository,UseCaseOrganizationStatus])
export class OrganizationStatusHandlers{
	constructor(
		private readonly organizationStatusRepository:OrganizationStatusRepository,
		private readonly useCaseOrganizationStatus:UseCaseOrganizationStatus
	) {
		
	}

	async handlerOrganizationsListStatus(point:IOrganization){
		try {
			
			const requestResult = await this.organizationStatusRepository.repositoryOrganizationStatus(point.guid)
			const result:IPointStatus | null = this.useCaseOrganizationStatus.getOrganizationStatus(requestResult)
			return  this.useCaseOrganizationStatus.organizationStatusMetods(result,point)
			
		} catch (error) {
			console.log(error);
		}
	}

	handlerTest(){
		return organizationStatusComandBus.handlersComandSubject.next('qqqqq')
	}
	
	
	
}