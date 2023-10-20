export const ROUTE_APP = {
  MAIN: "/",
  CITILIST: "/cities",
  POINT: "/point",
  SHOP: {
    SHOP_MAIN: "/shop",
		SHOP_SERCH: "/shop/serch",
    SHOP_PRODUCT: "/shop/product/:id",
		SHOP_RESERVE: "/shop/reservetable"
  },
  CART: {
    BASKET_MAIN:"/basket/main"
  },
  ORDER:{
		ORDER_MAIN: "/order/main",
		ORDER_MAP: "/order/map",
	},
  PAGES: {
    ABOUT:'/about',
		GUESTVIP:'/guestvip'
  },
	AUTH:{
		REGISTER:'/register'
	},
	MAP:{
		DELIVERY_MAP:'/deliverymap'
	},
	PROFILE:{
		PROFILE_MAIN:'/profile',
		PROFILE_PERSONAL:'/profile/personal',
		PROFILE_ADRESS:'/profile/adress'
	}
}


export const QUERY_APP = {
	ORGANIZATION:"organuzation",
	ONSPOT_TABLE:"table",
	DELIVERY_METOD:"delivMetod"
}