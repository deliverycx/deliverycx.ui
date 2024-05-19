import { cityModel } from "modules/CityModule/city.module";
import { organizationModel, organizationModule, organizationStatusModule } from "modules/OrganizationModule/organization.module";
import { QueryClient, useQuery } from "react-query";
import { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { IOrganizationStatus } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type";


export function useOrganizationsViewModel(this:any) {
	const organizations = organizationModel.organizationList
	const city = cityModel.selectCity
	const navigate = useNavigate()
	const [pointCords,setPointCords] = useState<string[] | null>(null)
	const [pointIndex,setPointIndex] = useState<string | null>(null)
	//const [organizations,setOrganizations] = useState<IOrganization[] | null>(null)

	/**/
	useQuery('organizations', async () => city && organizationModule.handlerBus.handlerOrganizationsList(city.id),{
    refetchOnWindowFocus: true,
		enabled: !!city,
  }) 
	

	
	
	useEffect(()=>{
		organizationModule.queryBus.handleOrganizationListMerdgeStatus((data:IOrganization[])=>{
			
			data && organizationModel.actionSetOrganizationAll(data)
		})

		/*
		if(city){
			organizationModule.handlerBus.handlerOrganizationsList(city.id)
		}else{
			navigate(ROUTE_APP.MAIN)
		}
		*/
		!city && navigate(ROUTE_APP.MAIN)
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