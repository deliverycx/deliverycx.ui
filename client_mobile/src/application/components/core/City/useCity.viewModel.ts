

import { cityModel, useCaseCity } from 'modules/CityModule/city.module';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useMemo } from 'react';
import { useMutation, useQuery,QueryClient } from 'react-query';
import { requestCity } from 'modules/CityModule/data/city.request';
import { ICity } from 'modules/CityModule/interfaces/city.type';


export function useCityViewModel(this:any) {
	const queryClient = new QueryClient()
	//store
	const cityMap = cityModel.sityList
	const citySelect = cityModel.selectSity


	/*
	const {data,isLoading} = useQuery('city', async () => await useCaseCity.handlerGetCity(''),{
    refetchOnWindowFocus: true,
  }) 
	
	const seletCity = useMutation(
		async (name:string) => await useCaseCity.handlerGetCity(name || ''), {
    onSuccess: () => {
      queryClient.invalidateQueries('city')
    },
  })
	*/

	useEffect(()=>{
			useCaseCity.handlerGetCity('')
	},[])

	const submitCity = (city:ICity) =>{
		useCaseCity.cityModel.actionSelectSity(city)
	}

	const seletCity = (name:string) =>{
		useCaseCity.handlerGetCity(name)
	}

	//console.log(citySelect);


	this.data({
		cityMap
	});
	this.handlers({
		seletCity,
		submitCity
	});
	this.status({
		
	});
}