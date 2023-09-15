import { OrganizationDTO } from "./organization.dto"

export interface IOrganizationResponse {
	reservetable: boolean
  id:	string
  address:	string
  city:	string
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

export type OrganizationFilters = {
	_id:string
	name:string
	images:string[]
}

export type IWorkTimePoint = {
	typework:"WORK" | "NOWORK" | "ONWORK"
	todaytime:string[]
	timelist:string[] | string

}

export type pointSerch= {
	data:string
	cityid:string
}

export type IOrganization = OrganizationDTO