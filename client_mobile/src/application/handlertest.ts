import EntitiTest from "./entititest";
import { myName } from "./mobtwo";
import repository from "./repository";
import { Observable } from 'rxjs';

class HandlerTest{
	private readonly mob = myName



	getSiti(){
		return new Observable((subscriber) => {
			console.log('Hello');
			subscriber.next(42);
		});
		//const {data} = await repository.getAll('')
		//console.log(data);
	}

}
export const handlerTest = new HandlerTest()