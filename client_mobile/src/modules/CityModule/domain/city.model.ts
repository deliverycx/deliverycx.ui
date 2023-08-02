import { action, computed, makeObservable, observable } from "mobx"
import { CityDTO } from "../interfaces/city.dto"
import { CityRepository } from "../data/city.repository"
import { makePersistable } from 'mobx-persist-store';
import { ICity } from 'modules/CityModule/interfaces/city.type';

export class CityModel extends CityRepository {
	sityList: Array<CityDTO> = []
	selectSity:CityDTO | null = null

	constructor() {
		super()
		makeObservable(this, {
			sityList: observable,
			selectSity: observable,
			actionSetSity: action,
			actionSelectSity:action,
		})
		makePersistable(this, { name: 'SampleStore', properties: ['selectSity'],storage: window.localStorage });

	}

	
	actionSetSity(name: string) {
		/*
		this.getCityRepository(name).subscribe((data: any) => {
			this.sityList = data
		})
		*/
		return this.getCityRepository(name).then((data: any) => {
			this.sityList = data
			return data
		})
	}

	actionSelectSity(city:ICity){
		this.selectSity = city
	}


}