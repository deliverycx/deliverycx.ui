import cn from "classnames";
import { FC, useCallback, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchAllCart, setOrderType } from "servises/redux/slice/cartSlice";
import { useSelector } from 'react-redux';
import { RootState } from 'servises/redux/createStore';
import { CART_CHOICE } from "application/contstans/cart.const";
import { ROUTE_APP } from "application/contstans/route.const";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { DELIVERY_METODS, DILIVERY_TIME_STATUS } from "application/contstans/const.orgstatus";
import { useOrganizationStatus } from "application/hooks/useOrganizationStatus";
import { actionSelectPayment } from "servises/redux/slice/bankCardSlice";
import { RequestCart } from "servises/repository/Axios/Request";
import { CartFormMetods } from "../HOC_CartForm/CartMetods";
import { useRouter } from "next/router";
import { delivertyTime } from "application/helpers/workTime";

const CartChoise: FC = () => { 
	

		const dispatch = useDispatch()
		const router = useRouter()
		const activeChoice = useSelector((state: RootState) => state.cart.orderType)
		const pointstatus = adapterSelector.useSelectors(selector => selector.pointstatus)
    const { delivMetod } = adapterSelector.useSelectors(
      (selector) => selector.point
  );
	
	if(!pointstatus){
		router.push(ROUTE_APP.MAIN)
	}

		const [tsx,switchMetod] = useOrganizationStatus()
		console.log(tsx);	
	
		useEffect(() => {
			
			const time = delivertyTime()
			console.log((time && time.status === DILIVERY_TIME_STATUS.ONLIPICKUP));
      if (tsx.OnliPICKUP() || (time && time.status === DILIVERY_TIME_STATUS.ONLIPICKUP)) {
          dispatch(setOrderType(CART_CHOICE.PICKUP))
      }
  }, [tsx.pointstatus.deliveryMetod,activeChoice]);
	
		const handlerChangeDelivMetod = useCallback((choise:string) => {
      dispatch(setOrderType(choise))
      dispatch(fetchAllCart()) 
    },[activeChoice])

		const CN = (metod:string) => cn("cart__choice__item", {active: activeChoice === metod});

		tsx.Delivery((
			<div className="cart__choice">
            <div className={CN(DELIVERY_METODS.COURIER)} onClick={() => {handlerChangeDelivMetod(DELIVERY_METODS.COURIER)}}>Доставка</div>
            <div className={CN(DELIVERY_METODS.PICKUP)} onClick={() => {handlerChangeDelivMetod(DELIVERY_METODS.PICKUP)}}>Самовывоз</div>
        </div>
		))
		tsx.OnliPICKUP((
			<div className="cart__choice">
            <div className={CN(DELIVERY_METODS.PICKUP)} onClick={() => {handlerChangeDelivMetod(DELIVERY_METODS.PICKUP)}}>Самовывоз</div>
        </div>
		))

		

    return (
			<>
				{
					switchMetod()
				}
			</>
        
    )
}

export default CartChoise;