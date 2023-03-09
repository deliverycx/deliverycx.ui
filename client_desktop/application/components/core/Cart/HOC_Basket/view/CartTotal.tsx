import { adapterSelector } from 'servises/redux/selectors/selectors';
import CartPriceInfo from '../../Presentation/CartPriceInfo';
import React from "react";
import Discounts from '../HOC_Discount';

const CartTotal = () => {
  const {totalPrice} = adapterSelector.useSelectors(selector => selector.cart)
	return (
		<div className="cart_bottom">
			<Discounts />
			<div className="cart-bottom-info">
				<div className="cart-info--total">Итого:</div>
				<div className="cart-info">
					<div className="cart-info__box price_info">
						<CartPriceInfo />
					</div>
					<span className="cart-info--price">{totalPrice} ₽</span>
				</div>
			</div>
		</div>
	);
}
export default CartTotal
