

import { cityModel, useCaseCity } from 'modules/CityModule/city.module';
import { useEffect } from 'react';

export function useCityViewModel(this:any) {
	const cityMap = cityModel.sityList
	
	useEffect(()=>{
		useCaseCity.handlerGetCity('')
	},[])

	const submitCity = (name:string) =>{
		useCaseCity.handlerGetCity(name)
	}

	

	this.data({
		cityMap
	});
	this.handlers({
		submitCity
	});
	this.status({});
}