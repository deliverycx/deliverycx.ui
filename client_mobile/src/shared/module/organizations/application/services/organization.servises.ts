import { InjectableDI } from 'application/helpers/dependencyInjection';
import { IOrganization } from '../../interfaces/types/organization.type';

@InjectableDI()
export class OrganizationServises {
	existingOrganization(pointMap: IOrganization[]) {
		return pointMap.filter((value) => {
			return value && value.isHidden == false;
		});
	}
	existingCardOrganization(point: IOrganization) {
		if (point && point.isHidden !== true) {
			return point;
		} else {
			return false;
		}
	}
}
