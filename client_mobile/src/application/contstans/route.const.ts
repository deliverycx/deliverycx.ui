export const ROUTE_APP = {
	MAIN: "/",
	PRAVORAZDEL: "/pravorazdel",
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
		ORDER_SUCCESS: '/success',
		ORDER_CREATE:'/ordercreate',
	},
	PAGES: {
		ABOUT:'/about',
		GUESTVIP:'/guestvip'
	},
	AUTH:{
		REGISTER:'/register',
		AUTORIZATE:'/autorizate'
	},
	MAP:{
		DELIVERY_MAP:'/deliverymap'
	},
	PROFILE:{
		PROFILE_MAIN:'/profile',
		PROFILE_PERSONAL:'/profile/personal',
		PROFILE_ADRESS:'/profile/adress',
		PROFILE_ORDERS:'/profile/orders'
	},
	ERRORS: {
		ERROR404: '/404',
		ERROR501: '/501'
	}
}


export const QUERY_APP = {
	ORGANIZATION:"organuzation",
	ONSPOT_TABLE:"table",
	DELIVERY_METOD:"delivMetod"
}