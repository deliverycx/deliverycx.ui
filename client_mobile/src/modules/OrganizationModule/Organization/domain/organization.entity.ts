import { IOrganizationResponse } from "../interfaces/organization.type"

export class OrganizationEntiti {
	existingOrganization(pointMap: IOrganizationResponse[]) {
		return pointMap.filter((value: IOrganizationResponse) => {
			return value && value.isHidden == false
		})

	}
}