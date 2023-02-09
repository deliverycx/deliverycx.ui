import { IRoute } from "@types";
import About from "application/components/common/About/About";
import ErrorPage from "application/components/common/Errors/ErrorPage";
import CityList from "application/components/core/Location/CityList/CityList";
import Points from "application/components/core/Location/Points/Points";
import { ROUTE_APP } from "application/contstans/route.const";
import CitiListLayout from "presentation/layout/Location/CitiListLayout";
import { lazy } from "react";

const publicRoutes: IRoute[] = [
  {
      exact: true,
      path: ROUTE_APP.MAIN,
      component: lazy(() => import('application/components/core/Location/CityList/CityList')),
      layout:CitiListLayout,
  },
  {
    exact: true,
    path: ROUTE_APP.POINT,
    component: lazy(() => import('application/components/core/Location/Points/Points')),
    
  },
  {
    exact: true,
    path: ROUTE_APP.PAGES.ABOUT,
    component: About,
    
  },
	{
    exact: true,
    path: ROUTE_APP.ERROR,
    component: ErrorPage,
    
  }
  
  
]
export default publicRoutes