import { cityModel } from "modules/CityModule/city.module";
import { organizationModel, useCaseOrganization } from "modules/OrganizationModule/organization.module";
import { QueryClient, useQuery } from "react-query";
import { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';

export function useOrganizationsViewModel(this:any) {
	const organizations = organizationModel.organizationList
	const city = useCaseOrganization.cityModel.selectCity
	const navigate = useNavigate()
	const [pointCords,setPointCords] = useState<string[] | null>(null)
	
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

	const selectPointPosition = (cords:string[]) =>{
		
		setPointCords(cords)
	}



	this.data({
		organizations,
		city,
		pointCords
	});
	this.handlers({
		handleBackCity,
		selectPointPosition
	});
	this.status({
		
	});
}