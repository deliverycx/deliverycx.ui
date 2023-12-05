import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    cartSelector,
    fetchAllCart,
    fetchDeleteCart,
		fetchDiscountCart,
		setTotalPrice
} from "servises/redux/slice/cartSlice";
import cn from "classnames";
import { useOutside } from "application/hooks/useOutside";
import { useDeepCompareEffect } from "application/hooks/useDeepCompareEffect";
import { ROUTE_APP } from "application/contstans/route.const";
import { RootState } from "servises/redux/createStore";
import debounce from "lodash.debounce";
import { checkPoint } from "application/helpers/checkPoint";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { IReqCart } from "@types";
import { validationHIdiscount } from "application/helpers/validationHIdiscount";
import { fetStopList } from "servises/redux/slice/shopSlice";
import { delivertyTime, workTimeHelp } from "application/helpers/workTime";
import { DILIVERY_TIME_STATUS } from "application/contstans/const.orgstatus";

export function useCartSmall(this: any) {
    const [showSmallCart, setShowSmallCart] = useState(false);

    this.data({
        showSmallCart
    });
    this.handlers({
        setShowSmallCart
    });
}

export function useCartSmallButton(this: any) {
    const dispatch = useDispatch();
    const cartList = useSelector(cartSelector.selectAll);
    const [isCategoriesCartVisible, setIsCategoriesCartVisible] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);
    const emptyCN = cn("header_cart", { incart: itemsCount, categoriesCartVisible: isCategoriesCartVisible });
    const selectedCity = adapterSelector.useSelectors((selector) => selector.city);
		const time = delivertyTime()

    const linkHandler = (modal: any) => {
				if((time && time.status === DILIVERY_TIME_STATUS.NODELIVERY) && !workTimeHelp()){
					return
				}
        itemsCount > 0 && checkPoint() && modal(true);
    };

    useDeepCompareEffect(async () => {
        if (!checkPoint(false)) {
          dispatch(fetchDeleteCart())
        } else {
          dispatch(fetchAllCart())
           setItemsCount(
                cartList.reduce((acc, el: any) => {
                    return acc + el.amount;
                }, 0)
           );
        }
    }, [cartList]);

  const onScroll = useCallback(debounce(() => {
    const docu = document.documentElement.scrollHeight - 500
    const scrolis = Math.round(window.scrollY)

    if (scrolis && docu > scrolis) {
      !isCategoriesCartVisible && setIsCategoriesCartVisible(true)
    } else {
      setIsCategoriesCartVisible(false)
    }
  }, 100), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

    this.data({
        itemsCount,
        emptyCN
    });
    this.handlers({
        linkHandler
    });
    this.status({});
}

export function useCartItems(this: any, empty: any) {
    const dispatch = useDispatch();
    const cartList = useSelector(cartSelector.selectAll);
    const orderError = useSelector((state: RootState) => state.cart.orderError);
		const {guid} = adapterSelector.useSelectors(selector => selector.point)

  useEffect(() => {

      if (!checkPoint(false)) {
        //dispatch(fetchDeleteCart())
        //empty();
      } else {
        dispatch(fetchAllCart())
      }
    },[])
    useEffect(() => {
      if (cartList.length === 0) {
          //empty();
      }else{
				guid &&	dispatch(fetStopList(guid))
			}
    }, [cartList.length,guid]);

    const debounceClearHandler = debounce(() => {
        dispatch(fetchDeleteCart());
    }, 400);

    this.data({
        cartList,
        orderError: orderError
    });
    this.handlers({
        debounceClearHandler
    });
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