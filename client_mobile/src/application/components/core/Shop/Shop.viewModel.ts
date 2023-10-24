import { organizationModel, organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { useQuery, useQueryClient } from "react-query";
import { shopUseCase } from "modules/ShopModule/shop.module";

import { basketUseCase } from "modules/BasketModule/basket.module";
import { ICategory } from "modules/ShopModule/interfaces/shop.type";

export function useShopViewModel(this: any) {

	const [selectCat,setSelectCat] = useState<ICategory | null>(null)
	const organization = organizationModel.selectOrganization
	const navigate = useNavigate()

	const { data:nomenclatures, isLoading } = useQuery('shop', async () => await shopUseCase.getNomenclature(organization?.guid), {
		refetchOnWindowFocus: false,
		cacheTime:5
	})

	
	



	useEffect(() => {
		if (!organization) {
			navigate(ROUTE_APP.MAIN)
		}else{
			useCaseOrganizationStatus.statusOrganization()
			//userRegister()
			
		}
	}, [organization])


	useEffect(()=>{
		if(!isLoading && nomenclatures){
			basketUseCase.cartCase()
			shopUseCase.getStopList()
		}
	},[nomenclatures,isLoading])
	


	this.data({
		organization,
		nomenclatures,
		selectCat
	});
	this.handlers({
		setSelectCat
	});
	this.status({
		isLoading
	});
}