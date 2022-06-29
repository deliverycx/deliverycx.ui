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