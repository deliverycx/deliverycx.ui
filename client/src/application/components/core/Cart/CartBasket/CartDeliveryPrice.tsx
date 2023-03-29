import { FC } from "react";
import { adapterSelector } from "servises/redux/selectors/selectors";

const CartDeliveryPrice: FC = ()=>{
    const {orderPrice} = adapterSelector.useSelectors(selector => selector.cart)

    return (
        <div className="cart__order-info container">
            <div className="cart__order__delivery-wrap">
                <div className="cart__order__delivery-title">Доставка:</div>
                { orderPrice.deltaPrice === 0
                    ? <div className="cart__order__delivery-sum free">Бесплатно</div>
                    : <div className="cart__order__delivery-sum">+{orderPrice.deliveryPrice} ₽</div>
                }
            </div>
        </div>
    )
}

export default CartDeliveryPrice;
