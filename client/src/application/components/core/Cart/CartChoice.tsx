/* eslint-disable no-mixed-spaces-and-tabs */
import cn from "classnames";
import { FC, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCart, setOrderTable, setOrderType } from "servises/redux/slice/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { CART_CHOICE } from "application/contstans/cart.const";
import { useHistory } from "react-router-dom";
import { ROUTE_APP } from "application/contstans/route.const";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { actionSelectPayment } from "servises/redux/slice/bankCardSlice";
import { CartFormMetods } from "./CartForm/CartMetods";
import { RequestCart } from "servises/repository/Axios/Request";
import { useOrganizationStatus } from "application/hooks/useOrganizationStatus";
import { DELIVERY_METODS } from "application/contstans/const.orgstatus";
import useCartDelivMetods from "application/hooks/useCartDelivMetods";

const CartChoise: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

		/*
    const activeChoice = useSelector(
        (state: RootState) => state.cart.orderType
    );
    const { delivMetod,guid } = adapterSelector.useSelectors(
        (selector) => selector.point
    );
		const { orderTable } = adapterSelector.useSelectors((selector) => selector.cart);

		const pointstatus = adapterSelector.useSelectors(selector => selector.pointstatus)

		const { paymentMetod } = adapterSelector.useSelectors((selector) => selector.bankcard);


    const deliveryCN = cn("cart__choice__item", {
        active: activeChoice === CART_CHOICE.COURIER
    });
    const pickupCN = cn("cart__choice__item", {
        active: activeChoice === CART_CHOICE.PICKUP
    }); //activeChoice === CART_CHOICE.PICKUP
    const onspotCN = cn("cart__choice__item", { 
			active: activeChoice === CART_CHOICE.ONSPOT
		}); // activeChoice === CART_CHOICE.ONSPOT

    useEffect(() => {
        if (delivMetod === CART_CHOICE.PICKUP) {
            dispatch(setOrderType(delivMetod))
        }

        if (activeChoice === CART_CHOICE.COURIER) {
						//dispatch(actionSelectPayment(CartFormMetods.paymentsMetod[0]))
            history.push(ROUTE_APP.CART.CART_DELIVERY);
        } else if (activeChoice === CART_CHOICE.PICKUP) {
            history.push(ROUTE_APP.CART.CART_PICKUP);
        } else if (activeChoice === CART_CHOICE.ONSPOT) {
					dispatch(actionSelectPayment(CartFormMetods.paymentsMetodONSPOT[0]))
					history.push(ROUTE_APP.CART.CART_ONSPOT);
			}
    }, [activeChoice]);


		useEffect(() => {
			getAllTable()
		},[])


		const getAllTable = async () =>{
			try {
				const {data} = await RequestCart.orgTables(guid)
				if(data && data.length !== 0){
					const t = data[0]
				
	
					if(!orderTable){
						dispatch(setOrderTable({
							section:t.idsection,
							id:t.tables[0].id,
							numb:t.tables[0].number
						}))
					}
					
				}else{
					dispatch(setOrderTable(null))
					if(activeChoice === CART_CHOICE.ONSPOT){
						dispatch(setOrderType(CART_CHOICE.COURIER))
						dispatch(actionSelectPayment(CartFormMetods.paymentsMetod[0]))
	        	history.push(ROUTE_APP.CART.CART_DELIVERY);
					}
					
				}
			} catch (error) {
				console.log(error);
			}
		}

    const handlerChoice = useCallback(
        (choise: string) => {
            if (delivMetod !== CART_CHOICE.PICKUP) {
                dispatch(setOrderType(choise));
                dispatch(fetchAllCart());
            }
        },
        [activeChoice]
    );

				*/

		const activeChoice = useSelector((state: RootState) => state.cart.orderType);
		const pointstatus = adapterSelector.useSelectors(selector => selector.pointstatus)
		const [tsx,switchMetod] = useOrganizationStatus()

		if(!pointstatus){
			history.push(ROUTE_APP.MAIN)
		}
	
		useEffect(() => {
			if(tsx.OnliPICKUP()){
				dispatch(setOrderType(DELIVERY_METODS.PICKUP))
				history.push(ROUTE_APP.CART.CART_PICKUP,DELIVERY_METODS.PICKUP);
			}
		}, [tsx.pointstatus.deliveryMetod]);	
		
		useEffect(() => {
			getAllTable()
		},[])

		const { delivMetod,guid } = adapterSelector.useSelectors(
			(selector) => selector.point
		);
		const { orderTable } = adapterSelector.useSelectors((selector) => selector.cart);


		const getAllTable = async () =>{
			try {
				const {data} = await RequestCart.orgTables(guid)
				if(data && data.length !== 0){
					const t = data[0]
				
	
					if(!orderTable){
						dispatch(setOrderTable({
							section:t.idsection,
							id:t.tables[0].id,
							numb:t.tables[0].number
						}))
					}
					
				}else{
					dispatch(setOrderTable(null))
					if(activeChoice === CART_CHOICE.ONSPOT){
						dispatch(setOrderType(CART_CHOICE.COURIER))
						dispatch(actionSelectPayment(CartFormMetods.paymentsMetod[0]))
	        	history.push(ROUTE_APP.CART.CART_DELIVERY);
					}
					
				}
			} catch (error) {
				console.log(error);
			}
		}

		const handlerChangeDelivMetod = (urls:string,metod:string) =>{
			dispatch(setOrderType(metod));
			dispatch(fetchAllCart());
			history.push(urls);
		}

		const CN = (metod:string) => cn("cart__choice__item", {active: activeChoice === metod});

		tsx.DeliveryAllMetod((
			<div className="cart__choice">
            <div className={CN(DELIVERY_METODS.COURIER)} onClick={() => {handlerChangeDelivMetod(ROUTE_APP.CART.CART_DELIVERY,DELIVERY_METODS.COURIER)}}>Доставка</div>
            <div className={CN(DELIVERY_METODS.PICKUP)} onClick={() => {handlerChangeDelivMetod(ROUTE_APP.CART.CART_PICKUP,DELIVERY_METODS.PICKUP)}}>Самовывоз</div>
						<div className={CN(DELIVERY_METODS.ONSPOT)} onClick={() => {handlerChangeDelivMetod(ROUTE_APP.CART.CART_ONSPOT,DELIVERY_METODS.ONSPOT)}}>За столом</div>
        </div>
		))
		tsx.Delivery((
			<div className="cart__choice">
            <div className={CN(DELIVERY_METODS.COURIER)} onClick={() => {handlerChangeDelivMetod(ROUTE_APP.CART.CART_DELIVERY,DELIVERY_METODS.COURIER)}}>Доставка</div>
            <div className={CN(DELIVERY_METODS.PICKUP)} onClick={() => {handlerChangeDelivMetod(ROUTE_APP.CART.CART_PICKUP,DELIVERY_METODS.PICKUP)}}>Самовывоз</div>
        </div>
		))
		tsx.OnliPICKUP((
			<div className="cart__choice">
            <div className={CN(DELIVERY_METODS.PICKUP)} onClick={() => {handlerChangeDelivMetod(ROUTE_APP.CART.CART_PICKUP,DELIVERY_METODS.PICKUP)}}>Самовывоз</div>
        </div>
		))

		

    return (
			<>
				{
					switchMetod()
				}
			</>
        
    )
};

export default CartChoise;
