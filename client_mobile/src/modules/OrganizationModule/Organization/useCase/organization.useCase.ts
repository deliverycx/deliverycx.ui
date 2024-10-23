import { CityModel } from 'modules/CityModule/domain/city.model';
import { OrganizationModel } from '../domain/organization.model';
import {
	IOrganization,
	IOrganizationResponse,
} from '../interfaces/organization.type';
import { InjectableDI } from 'application/helpers/dependencyInjection';
import { OrganizationServises } from '../domain/organization.servises';
import { DTOMapper } from 'application/guards/aplication.guard';
import { organizationMapper } from '../interfaces/organization.dto';
import { OrganizationRepository } from '../data/organization.repository';

@InjectableDI([OrganizationServises])
export class UseCaseOrganization {
	constructor(public readonly organizationServises: OrganizationServises) { }

	@DTOMapper(organizationMapper)
	organizationAll(orgList: IOrganizationResponse[] | undefined) {
		if (Array.isArray(orgList) && orgList.length !== 0) {
			const result = this.organizationServises.existingOrganization(orgList);
			return result as unknown as IOrganization[];
		}
		return [];
	}

	selectOrganization(point: IOrganization | null) {
		//this.organizationModel.actionSelectOrganization(point ? point.guid : null)
	}


}
