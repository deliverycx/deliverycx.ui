import { delivertyTime, workTimeCheck, workTimeHelp } from "application/helpers/workTime"
import { IOrganizationResponse, OrganizationFilters } from "../interfaces/organization.type"
import { IsNotEmpty, IsObject, IsBoolean, IsString, IsOptional, IsArray } from "class-validator"
import * as organizationStatusType from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type"

export class OrganizationEntity {
	@IsNotEmpty()
	id!:string

	@IsObject()
	info!:{
		address:string
		cords:number[]
		phone:	string
		city:	string
	}

	@IsBoolean()
	isHidden!:boolean

	@IsObject()
	redirect!:{
		redirectUrl:string
		redirectON:boolean
	}

	@IsNotEmpty()
	workTime!: string | string[]
	
	@IsString()
	guid!:string

	@IsString()
	temital!:string

	@IsOptional()
	delivery!: string | null



	@IsArray()
	gallery!:string[] | []

	@IsBoolean()
	reservetable!:boolean
	
	filters!:OrganizationFilters[] | []


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