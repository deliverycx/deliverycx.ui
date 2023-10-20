export interface IPayment{
  id: string,
  value: string
}

export interface IInitialValues {
	comment: string;
	name: string;
	phone: string;
	address: string;
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