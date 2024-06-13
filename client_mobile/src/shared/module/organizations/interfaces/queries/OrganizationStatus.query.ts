import { InjectableDI } from 'application/helpers/dependencyInjection';
import { organizationStatusComandBus } from 'modules/OrganizationModule/organization.module';
import { OrganizationStatusRepository } from '../../infrastructure/repositories/organizationStatus.repository';

@InjectableDI()
export class OrganizationStatusQuery {
	constructor(private readonly organizationStatusRepository: OrganizationStatusRepository) { }

	async queryOrganizationStatus(organzationid: string) {
		const organizationStatus = await this.organizationStatusRepository.repositoryOrganizationStatus(organzationid)
		return organizationStatus
	}
}
