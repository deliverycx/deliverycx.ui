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
		ORDER_COURIER: "/order/delivery",
    ORDER_ONSPOT: "/order/onspot",
    ORDER_PICKUP: "/order/pickup",
	},
  PAGES: {
    ABOUT:'/about',
		GUESTVIP:'/guestvip'
  }
}


export const QUERY_APP = {
	ORGANIZATION:"organuzation",
	ONSPOT_TABLE:"table",
	DELIVERY_METOD:"delivMetod"
}