import ErrorPage from "application/components/common/Errors/ErrorPage"
import HOCCity from "application/components/core/City/HOC.City"
import { ROUTE_APP } from "application/contstans/route.const"
import { cityModel, useCaseCity } from "modules/CityModule/city.module"

export async function loader() {
  useCaseCity.handlerGetCity('')
	const cityMap = cityModel.sityList;
	console.log(cityMap);
	return cityMap
}
export const publicRoutes = [
	{
		path: ROUTE_APP.MAIN,
		element:<HOCCity />,
		errorElement: <ErrorPage />,
		//loader:loader
	}
]