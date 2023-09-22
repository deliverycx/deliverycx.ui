import { delivertyTime, workTimeCheck, workTimeHelp } from "application/helpers/workTime"
import { IOrganizationResponse } from "../interfaces/organization.type"

export class OrganizationEntiti {
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