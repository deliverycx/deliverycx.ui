import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import { ROUTE_APP } from 'application/contstans/route.const';
import HOCCity from 'application/components/core/City/HOC.City';
import HOCOrganizations from 'application/components/core/Organization/HOC.Organizations';
import HOCShop from 'application/components/core/Shop/HOC.Shop';
import HOCBasket from 'application/components/core/Basket/HOCBasket';
import HOCOrder from 'application/components/core/Order/HOC.Order';


export const publicRoutes = [
	{
			path: ROUTE_APP.MAIN,
			Component: HOCCity
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

	
]

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;