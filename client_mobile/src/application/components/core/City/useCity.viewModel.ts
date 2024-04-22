

import { cityModel, useCaseCity } from 'modules/CityModule/city.module';
import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useMutation, useQuery,QueryClient } from 'react-query';
import { requestCity } from 'modules/CityModule/data/city.request';
import { ICity } from 'modules/CityModule/interfaces/city.type';
import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { appUseCase } from 'modules/AppModule/app.module';
import { ROUTE_APP } from 'application/contstans/route.const';


export function useCityViewModel(this:any) {
	//const queryClient = new QueryClient()
	const navigate = useNavigate()
	const {cityList,selectCity} = cityModel

	
	const {data,isLoading} = useQuery('city', async () => await useCaseCity.handlerGetCity(''),{
    refetchOnWindowFocus: true,
  }) 
	/*
	const seletCity = useMutation(
		async (name:string) => await useCaseCity.handlerGetCity(name || ''), {
    onSuccess: () => {
      queryClient.invalidateQueries('city')
    },
  })
	*/

	useEffect(()=>{
		useCaseCity.handlerGetCity('')
		organizationModel.actionResetOrganizationAll()
	},[])

	const submitCity = (city:ICity) =>{
		if(selectCity && selectCity.id !== city.id){
			appUseCase.clearApp()
		}
		useCaseCity.cityModel.actionSelectSity(city)
	}

	const seletSerchCity = (name:string) =>{
		useCaseCity.handlerGetCity(name)
	}

	const closeModalDesc = () =>{
		navigate(ROUTE_APP.MAIN)
	}


	this.data({
		cityList
	});
	this.handlers({
		seletSerchCity,
		submitCity,
		closeModalDesc
	});
	this.status({
		
	});
}