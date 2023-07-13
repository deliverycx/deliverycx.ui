import { action, makeObservable, observable } from "mobx"
import { CityDTO } from "../domain/city.dto"
import { CityRepository } from "../repository/city.repository"

export class CityViewModel extends CityRepository{
	sityList: Array<CityDTO> | null = null

	constructor() {
		super()
		makeObservable(this, {
			sityList:observable,
			setSity: action,
	})
		
	}

	setSity(name:string){
		this.getCityRepository(name).subscribe((data:any) => {
			this.sityList = data.response
			//this.setSityList(this.sityList,data.response)
    })

	}
}
export const cityViewModel = new CityViewModel()