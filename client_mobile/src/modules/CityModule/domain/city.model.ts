import { action, makeObservable, observable } from "mobx"
import { CityDTO } from "../interfaces/city.dto"
import { CityRepository } from "../data/city.repository"

export class CityModel extends CityRepository{
	sityList: Array<CityDTO> = []

	constructor() {
		super()
		makeObservable(this, {
			sityList:observable,
			actionSetSity: action,
	})
		
	}

	actionSetSity(name:string){
		this.getCityRepository(name).subscribe((data:any) => {
			console.log(data);
			this.sityList = data
    })

	}
}