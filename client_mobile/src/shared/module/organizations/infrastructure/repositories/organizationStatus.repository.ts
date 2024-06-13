import { InjectableDI } from 'application/helpers/dependencyInjection';
import { RequestOrganizationStatusAPI } from '../../domain/repositories/organizationStatus.request';
import { DTOMapper } from 'shared/utils/dto';
import { organizationStatusMapper } from '../mapping/organizationStatus.mapps';

@InjectableDI([RequestOrganizationStatusAPI])
export class OrganizationStatusRepository {
	constructor(
		private readonly requestOrganizationStatusAPI: RequestOrganizationStatusAPI,
	) { }

	@DTOMapper(organizationStatusMapper)
	async repositoryOrganizationStatus(pointid: string) {
		try {
			const { data } =
				await this.requestOrganizationStatusAPI.getPointStatus(pointid);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
}
