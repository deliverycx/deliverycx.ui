import { NavLink, useNavigate } from "react-router-dom"
import { ROUTE_APP } from 'application/contstans/route.const';
import { IBasketPrice } from "modules/BasketModule/interfaces/basket.type";
import { FC } from "react";
import { basketUseCase } from "modules/BasketModule/basket.module";

const BasketOrder:FC<{basketPrice:IBasketPrice}> = ({basketPrice}) => {
	const navigate = useNavigate()

	const handlerOrder = async () =>{
		try {
			await basketUseCase.checkCartHI()
			navigate(ROUTE_APP.ORDER.ORDER_MAIN)
		} catch (error:any) {
			if (error.response.status === 422 && error.response) {
				basketUseCase.basketModel.actionCheckbasketError(error.response.data.errors)
			}
		}

	}


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
			
			<div className="btn btn-md btn-red" onClick={handlerOrder}>Оформить</div>
		</div>
	)
}
export default BasketOrder