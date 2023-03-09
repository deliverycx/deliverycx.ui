export interface ICity {
  id: string,
  name: string
	isHidden:boolean
}
export interface IPoint {
  id:	string
  address:	string
  city:	string
  cords:	number[]
  phone:	string
	guid:string
  workTime: string
  delivMetod: string | null
  isHidden:boolean
}

export type IPointStatus = {
	_id:string,
	organization:string,
	deliveryMetod:string[]
	organizationStatus:string
	paymentMetod:string[]
}