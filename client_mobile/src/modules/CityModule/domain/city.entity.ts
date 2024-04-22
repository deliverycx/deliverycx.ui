/* eslint-disable prefer-const */
import { IsNotEmpty, IsString, IsBoolean, IsNumber } from "class-validator";

import { ICity, ICityResponse } from "../interfaces/city.type";


export class CityEntiti {
	@IsNotEmpty()
	id!:string

	@IsString()
	cityname!:string

	@IsBoolean()
	isHidden!:boolean

	@IsNumber()
	countOrganization!:number

}