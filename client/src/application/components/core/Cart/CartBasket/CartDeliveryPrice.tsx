import { FC } from "react";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { CART_CHOICE } from "../../../../contstans/cart.const";

const CartDeliveryPrice: FC = ()=>{
    const {deliveryPrice} = adapterSelector.useSelectors(selector => selector.cart)
    const { deltaPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart);

    return (
        <div className="cart__order-info container">
            <div className="cart__order__delivery-wrap">
                <div className="cart__order__delivery-title">Доставка:</div>
                {
                    orderType === CART_CHOICE.COURIER && (
                        deltaPrice === 0
                    ? <div className="cart__order__delivery-sum free">Бесплатно</div>
                    : <div className="cart__order__delivery-sum">+{deliveryPrice} ₽</div>
                    )
                }
            </div>
        </div>
    )
}

export default CartDeliveryPrice;
