import { CityDTO } from "./city.dto"

 export type ICityResponse  = {
	id:string
	name:string
	isHidden:boolean
	countOrg:number
}

export type ICity  = CityDTO