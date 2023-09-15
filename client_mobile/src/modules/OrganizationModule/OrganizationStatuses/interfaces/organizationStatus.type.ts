import { OrganizationStatusDTO } from "./organizationStatus.dto"

export type IPointStatusRequest = {
	_id:string,
	organization:string,
	deliveryMetod:string[]
	organizationStatus:string
	paymentMetod:string[]
}

export type IPointStatus = OrganizationStatusDTO

export type IOrganizationStatus = {
	_id:string,
	organization:string,
	deliveryMetod:string[]
	organizationStatus:string
	paymentMetod:string[]
}

export type IDeliveryTypes = {
	metod:string
	name:string
	route:string
	active:boolean
}