import { InjectableDI } from 'application/helpers/dependencyInjection';
import { OrganizationServises } from '../services/organization.servises';
import { IOrganization } from '../../interfaces/types/organization.type';

@InjectableDI([OrganizationServises])
export class UseCaseOrganization {
	constructor(public readonly organizationServises: OrganizationServises) { }

	organizationsExist(organizationList: IOrganization[]) {
		if (organizationList) {
			this.organizationServises.existingOrganization(organizationList);
		}
		return null;
	}

	selectOrganization(point: IOrganization | null) {
		//this.organizationModel.actionSelectOrganization(point ? point.guid : null)
	}
}
