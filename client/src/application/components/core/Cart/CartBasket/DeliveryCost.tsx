/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { CART_CHOICE } from "../../../../contstans/cart.const";
import { adapterSelector } from "../../../../../servises/redux/selectors/selectors";

const DeliveryCost = () => {
    const { orderPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart);
    return (
        <div className="cart__memo">
            {
                orderType === CART_CHOICE.COURIER && (
									orderPrice.deltaPrice !== 0
                        && <div className="cart__memo__banner delivery">
                            <img src={require("assets/i/moto.svg").default} alt="стрелка" />
                            <div>До бесплатной доставки <br/> закажите на сумму: <b>{orderPrice.deltaPrice} ₽</b></div>
                        </div>
                )
            }
        </div>
    );
};

export default DeliveryCost;
