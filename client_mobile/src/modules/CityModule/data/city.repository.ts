import repository from "application/repository";
import { CityEntiti } from "../domain/city.entiti";
import { map, filter, catchError, of,from } from 'rxjs';
import { cityMapper } from "../interfaces/city.dto";
import { ICityResponse } from "../interfaces/city.type";

export class CityRepository extends CityEntiti {


	getCityRepository(name = '') {
		const users = repository.getAll(name)
			//response.response as ICityResponse
			.pipe(response => response.response)
			.pipe(
				
				//this.existingCity(response.response as ICityResponse)
				map(data => {
					console.log(data);
				}),
				/*
				map(response => {
					//console.log(response); //cityMapper(response as ICityResponse)
					return cityMapper(response as unknown as ICityResponse)
				}),
				*/
				catchError(error => {
					console.log('error: ', error);
					return of(error);
				})
			);

		/*
		users.subscribe({
			next: (value:any) => console.log('v',value),
			error: (err:any) => console.log('err',err)
		});
		*/

		return users

	}
}