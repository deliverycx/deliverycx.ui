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
}

export type IOrganizationStatus = {
	_id:string,
	organization:string,
	deliveryMetod:string[]
	organizationStatus:string
	paymentMetod:string[]
}

export type IOrganization = OrganizationDTO