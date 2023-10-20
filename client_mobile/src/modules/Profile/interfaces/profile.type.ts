import { IIkkoStreet } from "application/components/common/Maps/DeliveryMap/DeliveryAdressSelect"
import { ProfileDTO } from "./profile.dto"

export type IRequestProfile = {
	userid: string
	personal: IPersonal
	adressdelivery: any
}

export type IPersonal = {
	name: string,
	lastname: string,
	birthday: string,
	male: string,
	phone: string,
	email: string,
	spam: boolean
}

export type IAddressDelivery = {
	address: string,
	house: string,
	floor: string,
	entrance: string,
	intercom: string,
	flat: string,
	userid?:string
	city?:string
	kladrid:null | IIkkoStreet
}

export type IProfile = ProfileDTO