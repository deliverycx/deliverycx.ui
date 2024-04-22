import { InjectableDI } from "application/helpers/dependencyInjection";
import { CityModel } from "../domain/city.model";
import { CityServises } from "../domain/city.servises";
import { ICity } from 'modules/CityModule/interfaces/city.type';

@InjectableDI([CityModel,CityServises])
export class UseCaseCity{


	constructor(
		public readonly cityModel:CityModel,
		public readonly cityServises:CityServises
	){}
	
	getCityList(list:ICity[]){
		const filterByHidden = this.cityServises.existingCity(list)
		const result = this.cityServises.sortByNameCity(filterByHidden)
		return this.cityModel.actionSetSityList(result)
	}
}
