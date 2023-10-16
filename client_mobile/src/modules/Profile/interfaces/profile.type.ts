import { ProfileDTO } from "./profile.dto"

export type IRequestProfile = {
	userid: string
	personal: IPersonal
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

export type IProfile = ProfileDTO