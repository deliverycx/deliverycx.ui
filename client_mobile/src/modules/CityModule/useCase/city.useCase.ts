import { InjectableDI } from "application/helpers/dependencyInjection";
import { CityModel } from "../domain/city.model";
import { CityServises } from "../domain/city.servises";
import { ICity, ICityResponse } from 'modules/CityModule/interfaces/city.type';
import { DTOMapper } from "application/guards/aplication.guard";
import { cityMapper } from "../interfaces/city.dto";

@InjectableDI([CityModel,CityServises])
export class UseCaseCity{


	constructor(
		public readonly cityModel:CityModel,
		public readonly cityServises:CityServises
	){}
	
	@DTOMapper(cityMapper)
	getCityList(list:ICityResponse[] | undefined):ICity[] | null{
		if(list){
			const filterByHidden = this.cityServises.existingCity(list)
			return filterByHidden as unknown as ICity[] 
		}
		return null
		
		//return this.cityModel.actionSetSityList(result)
	}

	citySort(citys:ICity[] | null){
		if(citys){
			const result = this.cityServises.sortByNameCity(citys)	
			return result
		}
		return null
	}
}
