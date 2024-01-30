import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTE_APP } from 'application/contstans/route.const';
import HOCCity from 'application/components/core/City/HOC.City';
import HOCOrganizations from 'application/components/core/Organization/HOC.Organizations';
import HOCShop from 'application/components/core/Shop/HOC.Shop';
import HOCBasket from 'application/components/core/Basket/HOCBasket';
import HOCOrder from 'application/components/core/Order/HOC.Order';
import OrderAdressMap from 'application/components/core/Order/OrderAdress/OrderAdressMap/OrderAdressMap';
import UserRegister from 'application/components/common/Auth/view/UserRegister';
import HOCAUTH from 'application/components/common/Auth/HOC.Auth';
import { userUseCase } from 'modules/UserModule/user.module';
import { observer } from 'mobx-react-lite';
import HOCProfile from 'application/components/core/Profile/HOC.Profile';
import HOCPersonal from 'application/components/core/Profile/Personal/HOC.Personal';
import HOCDeliveryAdress from 'application/components/core/Profile/DeliveryAdress/HOC.DeliveryAdress';
import HOCDeliveryMap from 'application/components/common/Maps/DeliveryMap/HOC.DeliveryMap';
import OrderCreate from 'application/components/core/Order/OrderCreate/OrderCreate';
import OrderSucces from 'application/components/core/Order/OrderCreate/OrderSucces';
import OfferAuth from 'application/components/common/Auth/view/OfferAuth';
import HOCUserOrders from 'application/components/core/Profile/UserOrders/HOC.UserOrders';
import ErrorPage from "../components/common/Errors/ErrorPage";
import Pravorazdel from "../components/core/Pravorazdel/Pravorazdel";
import { Desktop, Mobile } from 'application/ResponseMedia';
import HOCdeskMain from 'application/components/core/Main/HOC.desk.Main';
import HOCCITYDesc from 'application/components/core/City/HOC.City.desc';
import HOCOrganizationsDesc from 'application/components/core/Organization/HOC.Organizations.desc';
import HOCBasketDesc from 'application/components/core/Basket/HOC.Basket.desc';
import HOCOrderDesc from 'application/components/core/Order/HOC.Order.desc';
import HOCDeliveryMapDesc from 'application/components/common/Maps/DeliveryMap/HOC.DeliveryMap.desc';
import HOCAUTHDesc from 'application/components/common/Auth/HOC.Auth.desc';
import HOCProfileDesc from 'application/components/core/Profile/HOC.Profile.desc';
import HOCPersonalDesc from 'application/components/core/Profile/Personal/HOC.Personal.desc';
import HOCDeliveryAdressDesc from 'application/components/core/Profile/DeliveryAdress/HOC.DeliveryAdress.desc';
import OrderCreateDesc from 'application/components/core/Order/OrderCreate/OrderCreate.desc';
import OrderSuccesDesc from 'application/components/core/Order/OrderCreate/OrderSucces.desc';
import LayoutDesctop from 'application/components/common/Layout/LayoutDesctop';





export const publicRoutesMobile = [
	{
		path: ROUTE_APP.MAIN,
		Component: HOCCity
	},
	{
		path: ROUTE_APP.PRAVORAZDEL,
		Component: Pravorazdel
	},
	{
		path: ROUTE_APP.POINT,
		Component: HOCOrganizations
	},
	{
		path: ROUTE_APP.SHOP.SHOP_MAIN,
		Component: HOCShop
	},
	{
		path: ROUTE_APP.CART.BASKET_MAIN,
		Component: HOCBasket
	},
	{
		path: ROUTE_APP.ORDER.ORDER_MAIN,
		Component: HOCOrder
	},
	{
		path: ROUTE_APP.ORDER.ORDER_MAP,
		Component: OrderAdressMap
	},
	{
		path: ROUTE_APP.ORDER.ORDER_CREATE + '/:hash',
		Component: OrderCreate
	},
	{
		path: ROUTE_APP.ORDER.ORDER_SUCCESS + '/:hash',
		Component: OrderSucces
	},
	{
		path: ROUTE_APP.AUTH.REGISTER,
		Component: HOCAUTH
	},
	{
		path: ROUTE_APP.AUTH.AUTORIZATE,
		Component: OfferAuth
	},
	{
		path: ROUTE_APP.PROFILE.PROFILE_MAIN,
		Component: HOCProfile,

	},
	{
		path: ROUTE_APP.PROFILE.PROFILE_PERSONAL,
		Component: HOCPersonal,
	},
	{
		path: ROUTE_APP.PROFILE.PROFILE_ADRESS,
		Component: HOCDeliveryAdress,
	},
	{
		path: ROUTE_APP.MAP.DELIVERY_MAP + '/:adress?',
		Component: HOCDeliveryMap,
	},
	{
		path: ROUTE_APP.PROFILE.PROFILE_ORDERS,
		Component: HOCUserOrders,
	},
	{
		path: ROUTE_APP.ERRORS.ERROR404,
		Component: ErrorPage,
	},
	{
		path: ROUTE_APP.ERRORS.ERROR501,
		Component: ErrorPage,
	}
]

const publicRoutesDeskop = [
	{
		path: ROUTE_APP.MAIN,
		Component: HOCdeskMain,
	},
	{
		path:ROUTE_APP.CITY,
		Component: HOCCITYDesc,
	},
	{
		path:ROUTE_APP.POINT,
		Component: HOCOrganizationsDesc,
	},
	{
		path: ROUTE_APP.SHOP.SHOP_MAIN,
		Component: HOCdeskMain,
	},
	{
		path: ROUTE_APP.CART.BASKET_MAIN,
		Component: HOCBasketDesc,
	},
	{
		path: ROUTE_APP.ORDER.ORDER_MAIN,
		Component: HOCOrderDesc,
	},
	{
		path: ROUTE_APP.ORDER.ORDER_MAP + '/:adress?',
		Component: HOCOrderDesc,
	},
	{
		path: ROUTE_APP.AUTH.REGISTER,
		Component: HOCAUTHDesc
	},
	{
		path: ROUTE_APP.PROFILE.PROFILE_MAIN,
		Component: HOCProfileDesc,

	},
	{
		path: ROUTE_APP.PROFILE.PROFILE_PERSONAL,
		Component: HOCPersonalDesc,
	},
	{
		path: ROUTE_APP.PROFILE.PROFILE_MAP + '/:adress?',
		Component: HOCProfileDesc,
	},
	{
		path: ROUTE_APP.ORDER.ORDER_CREATE + '/:hash',
		Component: OrderCreateDesc
	},
	{
		path: ROUTE_APP.ORDER.ORDER_SUCCESS + '/:hash',
		Component: OrderSuccesDesc
	},
	{
		path: ROUTE_APP.PRAVORAZDEL,
		Component:Pravorazdel,
		Layout:LayoutDesctop
	},
	{
		path: ROUTE_APP.ERRORS.ERROR404,
		Component:ErrorPage,
		Layout:LayoutDesctop
	},
	{
		path: ROUTE_APP.AUTH.AUTORIZATE,
		Component: HOCdeskMain
	},
]


//<Route path="*" element={<Navigate to="" />} />
const AppRouter = () => {

	return (
		<>
			<Desktop>
				<Routes>
					{publicRoutesDeskop.map(({ path, Component,Layout }) => {
						if(Layout){
							return <Route key={path} path={path} element={<Layout><Component /></Layout>}></Route>
						}
						return <Route key={path} path={path} element={<Component />}></Route>
					}

					)}
					
				</Routes>
			</Desktop>
			<Mobile>
				<Routes>
					{publicRoutesMobile.map(({ path, Component }) => {

						return <Route key={path} path={path} element={<Component />}></Route>
					}

					)}
					
				</Routes>
			</Mobile>
		</>
	);
};

export default observer(AppRouter);