import ErrorPage from "application/components/common/Errors/ErrorPage"
import HOCCity from "application/components/core/City/HOC.City"
import HOCOrganizations from "application/components/core/Organization/HOC.Organizations"

import { ROUTE_APP } from "application/contstans/route.const"

import {useCaseCity } from "modules/CityModule/city.module"


export const publicRoutes = [
	{
		path: ROUTE_APP.MAIN,
		element:<HOCCity />,
		errorElement: <ErrorPage />,
		loader:async () => await useCaseCity.handlerGetCity('')
	},
	{
		path: ROUTE_APP.POINT,
		element:<HOCOrganizations />,
		errorElement: <ErrorPage />,
		//loader:async () => await useCaseCity.handlerGetCity('')
	}
]