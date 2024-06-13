import { InjectableDI } from 'application/helpers/dependencyInjection';
import { OrganizationStatusHandlers } from 'modules/OrganizationModule/OrganizationStatuses/comands/OrganizationStatus.handlers';
import { UseCaseOrganization } from '../../application/useCases/organization.useCase';
import { OrganizationRepository } from '../../infrastructure/repositories/organization.repository';

@InjectableDI([OrganizationStatusHandlers])
export class OrganizationQuery {
	constructor(
		private readonly useCaseOrganization: UseCaseOrganization,
		private readonly organizationRepository: OrganizationRepository,
	) { }

	/*
	handleOrganizationListMerdgeStatus(action: any) {
		organizationComandBus.handlersComandSubject.subscribe(async (data: any) => {
			try {
				if (data && data.length !== 0) {
					const reduseOrg = await Promise.all(
						data.map(async (value: IOrganization) => {
							const status =
								await this.organizationStatusHandlers.handlerOrganizationsListStatus(
									value,
								);
							if (value.guid === status?.organization) {
								return {
									...value,
									...status,
								};
							}
						}),
					);

					action(reduseOrg);
					organizationComandBus.queryComandSubject.next(data);
				}
			} catch (error) {
				console.log(error);
			}
		});
	}
	*/

	async queryOrganizationBuCity(cityid: string) {
		const organizations = await this.organizationRepository.repositoryAllOrganization(cityid)
		if (organizations) {
			return this.useCaseOrganization.organizationsExist(organizations)
		}
	}
}
