import { InjectableDI } from "application/helpers/dependencyInjection";
import { CityComandBus } from "./City.comandBus";
import { cityComandBus } from "../city.module";

@InjectableDI()
export class CityQuery extends CityComandBus{

	handle(action:any){
		
		cityComandBus.handlersComandSubject.subscribe((data)=>{
			
			if(data){
				action(data)
				cityComandBus.queryComandSubject.next(data)
			}
		});
		
	}
}