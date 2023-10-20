import { action, computed, configure, makeObservable, observable } from "mobx"
import { CityDTO } from "../interfaces/city.dto"
import { CityRepository } from "../data/city.repository"
import { makePersistable } from 'mobx-persist-store';
import { ICity } from 'modules/CityModule/interfaces/city.type';

export class CityModel extends CityRepository {
	cityList: Array<CityDTO> = []
	selectCity:CityDTO | null = null

	constructor() {
		super()
		makeObservable(this, {
			cityList: observable,
			selectCity: observable,
			actionSetSity: action,
			actionSelectSity:action,
		})
		makePersistable(this, { name: 'city', properties: ['selectCity'],storage: window.localStorage });
		/*
		configure({
			useProxies: "never"
		})
		*/
	}

	
	actionSetSity(name: string) {
		/*
		this.getCityRepository(name).subscribe((data: any) => {
			this.sityList = data
		})
		*/
		return this.getCityRepository(name).then((data: any) => {
			this.cityList = data
			return data
		})
	}

	actionSelectSity(city:ICity){
		this.selectCity = city
	}


}