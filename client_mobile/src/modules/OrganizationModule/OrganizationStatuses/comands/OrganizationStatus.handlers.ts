import { InjectableDI } from 'application/helpers/dependencyInjection';
import { OrganizationStatusRepository } from '../data/organizationStatus.repository';
import { UseCaseOrganizationStatus } from '../useCase/organizationStatus.useCase';
import { IPointStatus } from '../interfaces/organizationStatus.type';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { startWith } from 'rxjs/operators';
import { OrganizationStatusModel } from '../domain/organizationStatus.model';
import { OrganizationModel } from 'modules/OrganizationModule/Organization/domain/organization.model';

@InjectableDI([
	OrganizationStatusRepository,
	UseCaseOrganizationStatus,
	OrganizationStatusModel,
	OrganizationModel,
])
export class OrganizationStatusHandlers {
	constructor(
		private readonly organizationStatusRepository: OrganizationStatusRepository,
		private readonly useCaseOrganizationStatus: UseCaseOrganizationStatus,
		private readonly organizationStatusModel: OrganizationStatusModel,
		private readonly organizationModel: OrganizationModel,
	) { }

	async handlerOrganizationsListStatus(point: any) {
		try {
			const requestResult =
				await this.organizationStatusRepository.repositoryOrganizationStatus(
					point.guid,
				);
			const result: IPointStatus | null =
				this.useCaseOrganizationStatus.getOrganizationStatus(requestResult);
			return this.useCaseOrganizationStatus.organizationStatusMetods(
				result,
				point,
			);
		} catch (error) {
			console.log(error);
		}
	}

	async handlerOrganizationStatus() {
		try {
			if (this.organizationModel.selectOrganization) {
				const point = this.organizationModel.selectOrganization;
				const requestResult =
					await this.organizationStatusRepository.repositoryOrganizationStatus(
						point.guid,
					);
				const result: IPointStatus | null =
					this.useCaseOrganizationStatus.getOrganizationStatus(requestResult);
				const statusMetod =
					this.useCaseOrganizationStatus.organizationStatusMetods(
						result,
						point,
					);
				this.organizationStatusModel.actionOrganizationStatus(statusMetod);
				return statusMetod;
			}
		} catch (error) {
			console.log(error);
		}
	}
}
