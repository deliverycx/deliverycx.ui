import { NavLink } from "react-router-dom"
import { ROUTE_APP } from 'application/contstans/route.const';
import { IBasketPrice } from "modules/BasketModule/interfaces/basket.type";
import { FC } from "react";

const BasketOrder:FC<{basketPrice:IBasketPrice}> = ({basketPrice}) => {
	return (
		<div className="basket__buttons">
			<div className="basket__buttons__total">
				<h3 className="basket__buttons__total-title">
					Стоимость заказа
				</h3>
				<div className="basket__buttons__total__price">
					<div className="basket__buttons__total__price-cost price--cost">
						
						<h2>{basketPrice.fullPrice} ₽</h2>
					</div>
				</div>
			</div>
			<NavLink to={ROUTE_APP.ORDER.ORDER_MAIN} className="btn btn-md btn-red">
				Оформить
			</NavLink>
		</div>
	)
}
export default BasketOrder