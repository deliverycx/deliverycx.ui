import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cartSelector } from "servises/redux/slice/cartSlice";
import cn from "classnames";
import { useOutside } from "application/hooks/useOutside";
import { useDeepCompareEffect } from "application/hooks/useDeepCompareEffect";
import { ROUTE_APP } from "application/contstans/route.const";
import { RootState } from "servises/redux/createStore";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { validationHIdiscount } from "application/helpers/validationHIdiscount";

export function useAddCart(ref?: any) {
    const history = useHistory();
    const cartList = useSelector(cartSelector.selectAll);
    const [isPopupEmpty, setIsPopupEmpty] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);
    const emptyCN = cn("link-to-cart", { open: isPopupEmpty });

    const linkHandler = () => {
        itemsCount
            ? history.push(ROUTE_APP.CART.CART_DELIVERY)
            : setIsPopupEmpty(true);
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
        emptyCN
    });
    this.handlers({
        linkHandler
    });
    this.status({});
}

export function useCartItems() {
    const history = useHistory();
    const cartList = useSelector(cartSelector.selectAll);
    const orderError = useSelector((state: RootState) => state.cart.orderError);
    useEffect(() => {
        if (cartList.length === 0) {
            history.push(ROUTE_APP.SHOP.SHOP_MAIN);
        }
    }, [cartList]);

    this.data({
        cartList,
        orderError: orderError
    });
    this.handlers({});
}


export function useCartDiscountDzone(this: any) {
	const dispatch = useDispatch()
	const cartList = useSelector(cartSelector.selectAll);
	const {totalPrice,deltaPrice} = adapterSelector.useSelectors((selector) => selector.cart);
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