import { UserDTO } from "./user.dto";

export type IDatReg = {
	isNew: boolean;
	access?: string;
};
export interface IUserGuest {
	id: string
	username: string
	phone?:string
}
export interface IUpdateData {
	id: string
	username: string
	phone: string;
	code:string
}
export type IUser = UserDTO