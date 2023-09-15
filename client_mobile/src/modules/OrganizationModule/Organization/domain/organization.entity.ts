import { delivertyTime, workTimeCheck, workTimeHelp } from "application/helpers/workTime"
import { IOrganizationResponse, IWorkTimePoint } from "../interfaces/organization.type"

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

	timeWorkOrganizationEntiti(work:string[] | string):IWorkTimePoint {
		let typework:"WORK" | "NOWORK" | "ONWORK"
		let todaytime:string[] = []

		const worktime = workTimeHelp(work)
		const onworktime = delivertyTime(work,60)

		const today = workTimeCheck(work)
		if(today){
			todaytime = today.split('-')
		}

		if(onworktime && !worktime){
			typework = 'ONWORK'
		}else if(worktime){
			typework = 'NOWORK'
		}else{
			typework = 'WORK'
		}

		return{
			typework,
			todaytime,
			timelist:work
		}
	}
}