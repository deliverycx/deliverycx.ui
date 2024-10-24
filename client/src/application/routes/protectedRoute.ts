import { IRoute } from "@types";
import ReserveTableLayout from "application/components/common/reserveTable/ReserveTableLayout";

import { CartDelivery, CartOnspot, CartPickup } from "application/components/core/Cart";
import ShopSearch from "application/components/core/Shop/ShopSearch";
import { ROUTE_APP } from "application/contstans/route.const";
import { lazy } from "react";

const protectedRoutes: IRoute[] = [
  {
      exact: true,
      path: ROUTE_APP.SHOP.SHOP_MAIN,
      component: lazy(() => import('presentation/layout/Shop/ShopLayout'))
  },
  {
    exact: true,
    path: ROUTE_APP.SHOP.SHOP_PRODUCT,
    component: lazy(() => import('presentation/layout/Shop/ShopCardLayout'))
  },
	{
    exact: true,
    path: ROUTE_APP.SHOP.SHOP_SERCH,
    component: lazy(() => import('application/components/core/Shop/ShopSearch'))
  },
  {
    exact: false,
    path: ROUTE_APP.CART.CART_DELIVERY,
    component: CartDelivery,
    layout:lazy(() => import('presentation/layout/Cart/CartLayout'))
  },
  {
    exact: true,
    path: ROUTE_APP.CART.CART_ONSPOT,
    component: CartOnspot,
    layout:lazy(() => import('presentation/layout/Cart/CartLayout'))
  },
  {
    exact: true,
    path: ROUTE_APP.CART.CART_PICKUP,
    component: CartPickup,
    layout:lazy(() => import('presentation/layout/Cart/CartLayout'))
  },
  {
    exact: true,
    path: ROUTE_APP.CART.CART_MAP,
    component:lazy(() => import('application/components/core/Cart/CartYmap')),
    
  },
  
  {
    exact: false,
    path: ROUTE_APP.ORDER,
    component: lazy(() => import('application/components/core/Order/Ordering')),
    
  },

	{
    exact: false,
    path: ROUTE_APP.ORDER_CREATE,
    component: lazy(() => import('application/components/core/Order/OrderCreate')),
    
  },

	{
    exact: false,
    path: ROUTE_APP.DUALPAYMENT,
    component: lazy(() => import('application/components/core/Order/DyalPayment')),
    
  },

	{
    exact: false,
    path: ROUTE_APP.SHOP.SHOP_RESERVE,
    component: ReserveTableLayout,
    
  },
  
]

export default protectedRoutes;