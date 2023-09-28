import { cityModel } from "modules/CityModule/city.module";
import { organizationModel, useCaseOrganization } from "modules/OrganizationModule/organization.module";
import { QueryClient, useQuery } from "react-query";
import { useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';

export function useOrganizationsViewModel(this:any) {
	const organizations = organizationModel.organizationList
	const city = useCaseOrganization.cityModel.selectCity
	const navigate = useNavigate()
	
	useEffect(()=>{
		if(city){
			useCaseOrganization.organizationAll()
		}else{
			navigate(ROUTE_APP.MAIN)
		}
	},[city])

	const handleBackCity = () =>{
		navigate(ROUTE_APP.MAIN)
	}

	this.data({
		organizations,
		city
	});
	this.handlers({
		handleBackCity
	});
	this.status({
		
	});
}