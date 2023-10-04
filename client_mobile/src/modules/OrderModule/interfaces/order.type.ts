export interface IPayment{
  id: string,
  value: string
}

export interface IInitialValues {
	comment: string;
	name: string;
	phone: string;
	address: string;
	house:string;
	flat: string;
	intercom: string;
	entrance: string;
	floor: string;
	kladrid:string
	payment:string
	money:number
	timedelivery:string
}

export type IOrderOnspotTable = {
	section:string
	id:string
	numb:number
	tables:any[]
}