/* eslint-disable no-mixed-spaces-and-tabs */
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cartSelector, fetchRefreshCart } from "servises/redux/slice/cartSlice";
import cn from "classnames";
import { useOutside } from "application/hooks/useOutside";
import { useDeepCompareEffect } from "application/hooks/useDeepCompareEffect";
import { ROUTE_APP } from "application/contstans/route.const";
import { RootState } from "servises/redux/createStore";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { validationHIdiscount } from "application/helpers/validationHIdiscount";
import { fetStopList } from "servises/redux/slice/shopSlice";
import { CartFormMetods } from "application/components/core/Cart/CartForm/CartMetods";
import { CART_CHOICE } from "application/contstans/cart.const";
import { actionSelectPayment } from "servises/redux/slice/bankCardSlice";
import { delivertyTime, workTimeHelp } from "application/helpers/workTime";
import { DILIVERY_TIME_STATUS } from "application/contstans/const.orgstatus";

export function useAddCart(ref?: any) {
    const history = useHistory();
		const dispatch = useDispatch()
    const cartList = useSelector(cartSelector.selectAll);
		const activeChoice = useSelector((state: RootState) => state.cart.orderType);
		const {point} = useSelector((state: RootState) => state.location);
    const [isPopupEmpty, setIsPopupEmpty] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);
    const emptyCN = cn("link-to-cart", { open: isPopupEmpty });
		const time = delivertyTime()

    const linkHandler = () => {
				
				if(time && time.status === DILIVERY_TIME_STATUS.NODELIVERY && !workTimeHelp(point.workTime)){
					console.log('timeee');
					setIsPopupEmpty(true);
					return
				}
        if(itemsCount){
					if (activeChoice === CART_CHOICE.COURIER) {
							dispatch(actionSelectPayment(CartFormMetods.paymentsMetod[0]))
	            history.push(ROUTE_APP.CART.CART_DELIVERY);
		        } else if (activeChoice === CART_CHOICE.PICKUP) {
		            history.push(ROUTE_APP.CART.CART_PICKUP);
		        } else if (activeChoice === CART_CHOICE.ONSPOT) {
							dispatch(actionSelectPayment(CartFormMetods.paymentsMetodONSPOT[0]))
							history.push(ROUTE_APP.CART.CART_ONSPOT);
						}else{
							history.push(ROUTE_APP.CART.CART_DELIVERY);
						}
				}else{
					setIsPopupEmpty(true);
				}
    };
    useOutside(ref, () => setIsPopupEmpty(false), isPopupEmpty);
    useDeepCompareEffect(() => {
        setItemsCount(
            cartList.reduce((acc, el: any) => {
                return acc + el.amount;
            }, 0)
        );
    }, [cartList]);

    this.data({
        itemsCount,
        emptyCN,
				time
    });
    this.handlers({
        linkHandler
    });
    this.status({});
}

export function useCartItems() {
    const history = useHistory();
    const cartList = useSelector(cartSelector.selectAll);
		const dispatch = useDispatch()
    const orderError = useSelector((state: RootState) => state.cart.orderError);
		const {guid} = adapterSelector.useSelectors(selector => selector.point)

    useEffect(() => {
        if (cartList.length === 0) {
            history.push(ROUTE_APP.SHOP.SHOP_MAIN);
        }else{
					dispatch(fetStopList(guid))
				}
				
    }, [cartList.length]);


    this.data({
        cartList,
        orderError: orderError
    });
    this.handlers({});
}


export function useCartDiscountDzone(this: any) {
	const dispatch = useDispatch()
	const cartList = useSelector(cartSelector.selectAll);
	const [countDiscount,setCountDiscount] = useState(0)
	const [freeHi,setFreeHi] = useState(0)
	
	const {count,free} = validationHIdiscount(cartList) 


	useEffect(()=>{
		if(count !== 0){
			setCountDiscount(count)
			setFreeHi(free)
		}
	},[count])



	this.data({
		countDiscount,
		freeHi
	});
	this.handlers({
			
	});
}