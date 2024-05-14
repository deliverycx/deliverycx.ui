import { IOrganizationStatus } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type"
import { organizationDTO } from "./organization.dto"

export interface IOrganizationResponse {
	reservetable: boolean
  id:	string
	terminal:string
  address:	string
  city:	string
	cityid:{
		name:string
	}
  cords:	number[]
  phone:	string
	guid:string
  workTime: string | string []
  delivMetod: string | null
  isHidden:boolean
	redirect:string
	redirectON:boolean
	gallery:string[]
	filters:OrganizationFilters[]
}

export interface IRequisitiesOrganization {
	ogrn: string
	inn: string
	name: string
}

export type OrganizationFilters = {
	_id:string
	name:string
	images:string[]
}

export type OrganizationGoodPlaceID = {
	_id: string
	goodplaceid: string
	organization: string
}

export type pointSerch= {
	data:string
	cityid:string
}

export type IOrganization = typeof organizationDTO

export type IOrganizationAndStatuses = IOrganization & IOrganizationStatus