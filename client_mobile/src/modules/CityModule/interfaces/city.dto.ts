import { validatorDTO } from "application/helpers/validatorDTO";
import { ICityResponse } from "./city.type"
import {validate, IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";
import { mappersDTO } from "application/helpers/mappersDTO";

export class CityDTO{

	@IsNotEmpty()
	id!:string

	@IsString()
	cityname!:string

	@IsBoolean()
	isHidden!:boolean
	
}
export const cityDTO = new CityDTO()

export const cityMapper = (p:ICityResponse[] | ICityResponse):CityDTO[] | CityDTO => {
	return mappersDTO<ICityResponse,CityDTO>(p,(val)=>{
		cityDTO.id = val.id
		cityDTO.isHidden = val.isHidden
		cityDTO.cityname = val.name

		validatorDTO(cityDTO)
		return {...cityDTO}
	})
	
}
