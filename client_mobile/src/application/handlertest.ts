import EntitiTest from "./entititest";
import { myName } from "./mobtwo";
import repository from "./repository";
import { Observable } from 'rxjs';
import { map, catchError, of } from 'rxjs';

class HandlerTest {
	private readonly mob = myName



	getSiti() {

		const users = repository.getAll('Симф').pipe(
			map(response => response),
			catchError(error => {
				console.log('error: ', error);
				return of(error);
			})
		);

		users.subscribe({
			next: (value:any) => console.log('v',value),
			error: (err:any) => console.log('err',err)
		});

		return users
	}

}
export const handlerTest = new HandlerTest()