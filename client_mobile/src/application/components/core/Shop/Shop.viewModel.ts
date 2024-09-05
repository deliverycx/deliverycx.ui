import {
	organizationModel,
	organizationStatusModel,
	useCaseOrganizationStatus,
} from 'modules/OrganizationModule/organization.module';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { useQuery, useQueryClient } from 'react-query';
import { shopUseCase } from 'modules/ShopModule/shop.module';
import { useSearchParams } from 'react-router-dom';
import { basketUseCase } from 'modules/BasketModule/basket.module';
import { ICategory } from 'modules/ShopModule/interfaces/shop.type';
import { appUseCase } from 'modules/AppModule/app.module';
import { orderModel, orderUseCase } from 'modules/OrderModule/order.module';
import { Redirects } from 'application/helpers/redirectsOld';
import { useMediaQuery } from 'react-responsive';
import { isDesctomMediaQuery } from 'application/ResponseMedia';

export function useShopViewModel(this: any) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectCat, setSelectCat] = useState<ICategory | null>(null);
	const organization = organizationModel.selectOrganization;
	const [pointid, setPointid] = useState<string | undefined>();
	const navigate = useNavigate();
	//const isDesctomMediaQuery = useMediaQuery({ minWidth: process.env.REACT_APP_MEDIAQUERY_DESC })
	const descQuery = isDesctomMediaQuery();

	const { data: nomenclatures, isLoading } = useQuery(
		['shop', pointid],
		async () => await shopUseCase.getNomenclature(pointid),
		{
			enabled: !!pointid,
		},
	);

	useEffect(() => {
		if (
			organization &&
			organization.redirect &&
			organization.redirect.redirectON
		) {
			const point = organization.redirect
			setPointid(undefined);
			appUseCase.clearApp()
			Redirects(point);

		} else {
			if (!isLoading && nomenclatures) {
				basketUseCase.cartCase();
				shopUseCase.getStopList();
			}
		}
	}, [organization]);

	useEffect(() => {
		const queyOrg = searchParams.get('organuzation');
		const queyTable = searchParams.get('table');
		const delivMetod = searchParams.get('delivMetod');

		if (queyOrg) {
			/*
			appUseCase.clearApp()
			const obversPoint = useCaseOrganizationStatus.targetOrganization(queyOrg,delivMetod)
			
			if(obversPoint){
				obversPoint.subscribe(data =>{
					
					setPointid(data.guid)
					queyTable && orderUseCase.onSpotTableQR(data.guid,JSON.parse(queyTable))
				})
			}
			*/
		} else {
			if (!organization) {
				if (descQuery) {
					setPointid(String(process.env.REACT_APP_DEFAULT_ORG));
				} else {
					navigate(ROUTE_APP.MAIN);
				}
			} else {
				setPointid(organization.guid);
				//useCaseOrganizationStatus.statusOrganization()
				//userRegister()
			}
		}
	}, [searchParams, organization]);

	this.data({
		organization,
		nomenclatures,
		selectCat,
	});
	this.handlers({
		setSelectCat,
	});
	this.status({
		isLoading,
	});
}
