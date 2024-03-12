import { UserDTO } from "./user.dto";

export type IDatReg = {
	isNew: boolean;
	access?: string;
};
export interface IUserGuest {
	id: string
	username: string
	phone?:string
	password?:string
}
export interface IUpdateData {
	id: string
	username: string
	phone: string;
	code:string
	password:string
}
export type ILoginUser = {
	phone: string;
	password:string
}
export type IsendSms = {
	phone:string
}
export type IResetPass = {
	phone:string
	password:string
}

export type IUser = UserDTO