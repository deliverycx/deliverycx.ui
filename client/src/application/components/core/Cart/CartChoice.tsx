import cn from "classnames";
import { FC, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCart, setOrderType } from "servises/redux/slice/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { CART_CHOICE } from "application/contstans/cart.const";
import { useHistory } from "react-router-dom";
import { ROUTE_APP } from "application/contstans/route.const";
import { adapterSelector } from "servises/redux/selectors/selectors";

const CartChoise: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const activeChoice = useSelector(
        (state: RootState) => state.cart.orderType
    );
    const { delivMetod } = adapterSelector.useSelectors(
        (selector) => selector.point
    );

    const deliveryCN = cn("cart__choice__item", {
        active: activeChoice === CART_CHOICE.COURIER
    });
    const pickupCN = cn("cart__choice__item", {
        active: activeChoice === CART_CHOICE.PICKUP
    }); //activeChoice === CART_CHOICE.PICKUP
    const onspotCN = cn("cart__choice__item", { active: false }); // activeChoice === CART_CHOICE.ONSPOT

    useEffect(() => {
        if (delivMetod === CART_CHOICE.PICKUP) {
            dispatch(setOrderType(delivMetod))
        }
       
        if (activeChoice === CART_CHOICE.COURIER) {
            history.push(ROUTE_APP.CART.CART_DELIVERY);
        } else if (activeChoice === CART_CHOICE.PICKUP) {
            history.push(ROUTE_APP.CART.CART_PICKUP);
        }
    }, [activeChoice]);

    const handlerChoice = useCallback(
        (choise: string) => {
            if (delivMetod !== CART_CHOICE.PICKUP) {
                dispatch(setOrderType(choise));
                dispatch(fetchAllCart());
            }
        },
        [activeChoice]
    );

    return (
        <div className="cart__choice">
            <div
                className={deliveryCN}
                onClick={() => {
                    handlerChoice(CART_CHOICE.COURIER);
                }}
            >
                ????????????????
            </div>
            <div
                className={pickupCN}
                onClick={() => {
                    handlerChoice(CART_CHOICE.PICKUP);
                }}
            >
                ??????????????????
            </div>
            <div className={onspotCN}>???? ??????????</div>
        </div>
    );
};

export default CartChoise;
