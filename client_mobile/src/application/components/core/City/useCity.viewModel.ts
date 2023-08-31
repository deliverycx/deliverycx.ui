

import { cityModel, useCaseCity } from 'modules/CityModule/city.module';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useMemo } from 'react';
import { useMutation, useQuery,QueryClient } from 'react-query';
import { requestCity } from 'modules/CityModule/data/city.request';
import { ICity } from 'modules/CityModule/interfaces/city.type';
import { CityDTO } from 'modules/CityModule/interfaces/city.dto';
import { organizationModel } from 'modules/OrganizationModule/organization.module';


export function useCityViewModel(this:any) {
	//const queryClient = new QueryClient()
	
	const {cityList} = cityModel

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
		console.log('reset');
		organizationModel.actionResetOrganizationAll()
	},[])

	const submitCity = (city:ICity) =>{
		useCaseCity.cityModel.actionSelectSity(city)
	}

	const seletSerchCity = (name:string) =>{
		useCaseCity.handlerGetCity(name)
	}


	this.data({
		cityList
	});
	this.handlers({
		seletSerchCity,
		submitCity
	});
	this.status({
		
	});
}