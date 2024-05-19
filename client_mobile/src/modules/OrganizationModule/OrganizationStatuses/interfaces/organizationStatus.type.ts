import { organizationStatusDTO } from "./organizationStatus.dto"

export type IPointStatusRequest = {
	_id:string,
	organization:string,
	deliveryMetod:string[]
	organizationStatus:string
	paymentMetod:string[]
}

export type IPointStatus = typeof organizationStatusDTO

export type IOrganizationStatus = {
	organization:string,
	deliveryMetod:string[]
	deliveryTipe:IDeliveryTypes[]
	organizationStatus:string
	paymentMetod:string[]
	timeworkOrganization:IWorkTimePoint
}

export type IDeliveryTypes = {
	metod:string
	name:string
	active:boolean
	sort?:number
}

export type IWorkTimePoint = {
	typework:"WORK" | "NOWORK" | "ONWORK"
	todaytime:string[]
	timelist:string[] | string

}
