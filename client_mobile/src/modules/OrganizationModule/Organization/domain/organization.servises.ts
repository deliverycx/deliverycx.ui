import { InjectableDI } from "application/helpers/dependencyInjection"
import { IOrganizationResponse } from "../interfaces/organization.type"

@InjectableDI()
export class OrganizationServises{
	existingOrganization(pointMap: IOrganizationResponse[]) {
		return pointMap.filter((value: IOrganizationResponse) => {
			return value && value.isHidden == false
		})
	}
	existingCardOrganization(point:IOrganizationResponse){
		if(point && point.isHidden !== true){
			return point
		}else{
			return false
		}
	}
}