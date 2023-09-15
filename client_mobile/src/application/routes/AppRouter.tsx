import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import { ROUTE_APP } from 'application/contstans/route.const';
import HOCCity from 'application/components/core/City/HOC.City';
import HOCOrganizations from 'application/components/core/Organization/HOC.Organizations';
import HOCShop from 'application/components/core/Shop/HOC.Shop';


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