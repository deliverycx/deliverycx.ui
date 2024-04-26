import { CityEntiti } from "../domain/city.entity";
import { map, filter, catchError, of, from, OperatorFunction } from 'rxjs';
import { cityMapper } from "../interfaces/city.dto";
import { ICity, ICityResponse } from "../interfaces/city.type";
import { AjaxResponse } from "rxjs/ajax";
import { guardPiPeRepository, guardRepository } from "application/guards/repository.guard";
import { requestCity, requestCityAjax } from "./city.request";
import { DTOMapper } from "application/guards/aplication.guard";
import { InjectableDI } from "application/helpers/dependencyInjection";



@InjectableDI()
export class CityRepository{


	/*
	getCityRepository(name = '') {
		const users = requestCityAjax.getAll(name)
			.pipe(
				guardPiPeRepository<ICityResponse[]>(this.existingCity),
				map(response => {
					//console.log(response); //cityMapper(response as ICityResponse)
					return cityMapper(response as unknown as ICityResponse)
				}),
				
				catchError(error => {
					console.log('error: ', error);
					return of(error);
				})
			)




		return users

	}
	*/

	
	async getCityRepository(cityname: string) {
		try {
			const { data } = await requestCity.getAll(cityname) // получаем города по имени или без
			
			return data
		} catch (error) {
			console.log(error);
		}

	}
}