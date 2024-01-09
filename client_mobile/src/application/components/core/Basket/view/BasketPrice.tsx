import { IBasketPrice } from "modules/BasketModule/interfaces/basket.type"
import { FC } from "react"

const BasketPrice:FC<{basketPrice:IBasketPrice}> = ({basketPrice}) => {
	return (
		<div className="basket__content__price">
			<div className="basket__content__price__item">
				Стоимость заказа
				<div className="basket__content__price__item-cost price--cost">
					
					<h2>{basketPrice.fullPrice} ₽</h2>
				</div>
			</div>
			<span className="validate validate-additional">
				<img src={require("assets/images/icons/info_black.png")} alt="" />
				Стоимость доставки определяется в процессе оформления
				Условия доставки в отдалённые районы могут отличаться
			</span>
		</div>
	)
}
export default BasketPrice