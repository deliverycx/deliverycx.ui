import { CityModel } from "../domain/city.model";


export class UseCaseCity{


	constructor(
		public readonly cityModel:CityModel
	){}
	
	handlerGetCity(name:string){
		return this.cityModel.actionSetSity(name)
	}
}
