import { adapterSelector } from 'servises/redux/selectors/selectors';
import CartDeliveryPrice from '../../Presentation/CartDeliveryPrice';
import CartPriceInfo from '../../Presentation/CartPriceInfo';
import SpecialOfferGift from "../../../../common/SpecialOffer/SpecialOfferGift";
import React from "react";
import SpecialOfferLeft from "../../../../common/SpecialOffer/SpecialOfferLeft";

const CartTotal = () => {
  const {totalPrice} = adapterSelector.useSelectors(selector => selector.cart)
  return (
    <div className="cart_bottom">
			{/*<SpecialOfferGift/>*/}
			<SpecialOfferLeft/>
				<div className="cart-info">
					<div className="cart-info__box price_info">
						<CartPriceInfo />
					</div>
					<div className="cart-info__box cart-info__box--end">
						<span className="cart-info--total">Итого:</span>
						<span className="cart-info--price">{totalPrice} ₽</span>
					</div>
				</div>
			</div>
  )
}
export default CartTotal
