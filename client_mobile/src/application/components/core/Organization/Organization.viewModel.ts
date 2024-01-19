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
	const [pointIndex,setPointIndex] = useState<string | null>(null)
	
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

	const selectPointPosition = (index:string) =>{
		setPointIndex(index)
	}

	const closeModalDesc = () =>{
		navigate(ROUTE_APP.MAIN)
	}
	



	this.data({
		organizations,
		city,
		pointCords,
		pointIndex
	});
	this.handlers({
		handleBackCity,
		selectPointPosition,
		setPointIndex,
		setPointCords,
		closeModalDesc
	});
	this.status({
		
	});
}