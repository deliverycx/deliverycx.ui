import { FC } from "react";
import { adapterSelector } from "servises/redux/selectors/selectors";
import SpecialOfferFree from "../../../common/SpecialOffer/SpecialOfferGift";
import SpecialOfferLeft from "../../../common/SpecialOffer/SpecialOfferLeft";

const CartDeliveryPrice: FC = ()=>{
    const {deliveryPrice} = adapterSelector.useSelectors(selector => selector.cart)

    return (
        <div className="cart__order-info">
          {/*Акции*/}
          {/*<SpecialOfferFree/>*/}
          {/*<SpecialOfferLeft/>*/}
            <div className="cart__order__delivery-wrap">
                <div className="cart__order__delivery-title">Доставка</div>
                <div className="cart__order__delivery-sum">{deliveryPrice} ₽</div>
            </div>
        </div>
    )
}

export default CartDeliveryPrice;
