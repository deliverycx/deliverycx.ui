import { organizationModel, organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { useQuery } from "react-query";
import { shopUseCase } from "modules/ShopModule/shop.module";
import RequestProfile from "servises/Request/Request.Profile";
import { basketUseCase } from "modules/BasketModule/basket.module";

export function useShopViewModel(this: any) {
	const organization = organizationModel.selectOrganization
	const navigate = useNavigate()

	const { data:nomenclatures, isLoading } = useQuery('shop', async () => await shopUseCase.getNomenclature(organization?.guid), {
		refetchOnWindowFocus: true,
		cacheTime:1
	})


	useEffect(() => {
		if (!organization) {
			navigate(ROUTE_APP.MAIN)
		}else{
			useCaseOrganizationStatus.statusOrganization()
			userRegister()
		}
	}, [organization])

	const userRegister = async () =>{
		try {
			await RequestProfile.register();
			basketUseCase.cartCase()
		} catch (error) {
			console.log(error);
		}
		
	}



	this.data({
		organization,
		nomenclatures
	});
	this.handlers({

	});
	this.status({
		isLoading
	});
}