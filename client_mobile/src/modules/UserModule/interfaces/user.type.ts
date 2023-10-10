
export type IDatReg = {
	isNew: boolean;
	access?: string;
};
export interface IUserGuest {
	_id: string
	username: string

}
export interface IUpdateData {
	name?: string;
	phone?: string;
	address?: {
		home: number;
		street: string;
	};
	organizationId?: string;
}
