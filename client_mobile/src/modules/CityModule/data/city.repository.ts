import { CityEntiti } from "../domain/city.entity";
import { map, filter, catchError, of, from, OperatorFunction } from 'rxjs';
import { cityMapper } from "../interfaces/city.dto";
import { ICityResponse } from "../interfaces/city.type";
import { AjaxResponse } from "rxjs/ajax";
import { guardPiPeRepository, guardRepository } from "application/guards/repository.guard";
import { requestCity, requestCityAjax } from "./city.request";




export class CityRepository extends CityEntiti {


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

	async getCityRepository(cityname:string){
		const {data} = await requestCity.getAll(cityname)
		const result = guardRepository(this.existingCity)(data)
		return cityMapper(result as unknown as ICityResponse)
	}
}