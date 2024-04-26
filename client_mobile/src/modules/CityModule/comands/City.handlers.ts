import { InjectableDI } from "application/helpers/dependencyInjection";
import { CityComandBus } from "./City.comandBus";
import { UseCaseCity } from "../useCase/city.useCase";
import { CityRepository } from "../data/city.repository";
import { ICity } from "../interfaces/city.type";
import { cityComandBus } from "../city.module";

@InjectableDI([UseCaseCity,CityRepository])
export class CityHandlers extends CityComandBus{
	constructor(
		private readonly useCaseCity:UseCaseCity,
		private readonly cityRepository:CityRepository
	){
		super()
	}

	async handlerCityList(cityname:string){
		try {
			const repository = await this.cityRepository.getCityRepository(cityname)
			
			const result = this.useCaseCity.getCityList(repository)
			const citys = this.useCaseCity.citySort(result)
			cityComandBus.handlersComandSubject.next(citys)
			
		} catch (error) {
			console.log(error);
		}
		
	}
}