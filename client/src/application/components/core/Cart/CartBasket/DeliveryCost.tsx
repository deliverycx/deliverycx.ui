/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { CART_CHOICE } from "../../../../contstans/cart.const";
import { adapterSelector } from "../../../../../servises/redux/selectors/selectors";

const DeliveryCost = () => {
    const { deltaPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart);
    return (
        <div className="cart__memo">
            {
                orderType === CART_CHOICE.COURIER && (
                    deltaPrice === 0
                        ? <div className="cart__memo__banner free-deliv"><span className="ok-icon"></span>Бесплатная
                            доставка от 700 ₽</div>
                        : <div className="cart__memo__banner ">
                            <img src={require("assets/i/moto.svg").default} alt="стрелка" />
                            <div>До бесплатной доставки <br/> закажите на сумму: <b>{deltaPrice} ₽</b></div>
                        </div>
                )
            }
        </div>
    );
};

export default DeliveryCost;
