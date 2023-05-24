export const ROUTE_APP = {
  MAIN: "/",
  CITILIST: "/cities",
  POINT: "/point",
  SHOP: {
    SHOP_MAIN: "/shop",
    SHOP_PRODUCT: "/shop/product/:id",
		SHOP_RESERVE: "/shop/reservetable"
  },
  CART: {
    CART_DELIVERY: "/cart/delivery",
    CART_ONSPOT: "/cart/onspot",
    CART_PICKUP: "/cart/pickup",
    CART_MAP: '/cart/map',
    CART_ORDER: '/cart/order'
  },
  ORDER: '/success',
	DUALPAYMENT: '/dualpayment',
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