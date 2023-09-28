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

	active:boolean
}

export type IWorkTimePoint = {
	typework:"WORK" | "NOWORK" | "ONWORK"
	todaytime:string[]
	timelist:string[] | string

}
