

import { cityModel, cityModule } from 'modules/CityModule/city.module';
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

	const navigate = useNavigate()
	const {cityList,selectCity} = cityModel

	useEffect(()=>{
		cityModule.queryBus.queryCityList('')
	},[])

	const submitCity = (city:ICity) =>{
		if(selectCity && selectCity.id !== city.id){
			appUseCase.clearApp()
		}
		cityModel.actionSelectSity(city)
	}

	const seletSerchCity = (name:string) =>{
		cityModule.queryBus.queryCityList(name)
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