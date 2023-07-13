
import { useCityMOD } from "modules/CityModule/city.module";
import { cityViewModel } from "modules/CityModule/domain/city.model";
import { useEffect } from 'react';

export function useCity(this:any) {
	const cityMap = cityViewModel.sityList
	
	useEffect(()=>{
		useCityMOD.handlerGetCity()
	},[])

	const submitCity = (name:string) =>{
		useCityMOD.handlerGetCity(name)
	}

	console.log(cityMap);

	this.data({
		cityMap
	});
	this.handlers({
		submitCity
	});
	this.status({});
}