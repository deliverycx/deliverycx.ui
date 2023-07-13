import repository from "application/repository";
import { CityEntiti } from "../domain/city.entiti";
import { map, catchError, of } from 'rxjs';

export class CityRepository extends CityEntiti {
	

	getCityRepository(name = ''){
		const users = repository.getAll(name).pipe(
			map(response => response),
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