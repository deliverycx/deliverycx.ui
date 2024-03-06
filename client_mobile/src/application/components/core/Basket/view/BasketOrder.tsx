import { NavLink, useNavigate } from "react-router-dom"
import { ROUTE_APP } from 'application/contstans/route.const';
import { IBasketPrice } from "modules/BasketModule/interfaces/basket.type";
import { FC, useEffect, useState } from "react";
import { basketUseCase } from "modules/BasketModule/basket.module";
import { useOrganizationStatus } from "application/hooks/useOrganizationStatus";
import { observer } from "mobx-react-lite";
import { organizationModel, organizationStatusModel } from "modules/OrganizationModule/organization.module";
import OrderNotificate from "../../Order/view/OrderNotificate";

const BasketOrder:FC<{basketPrice:IBasketPrice}> = ({basketPrice}) => {
	const navigate = useNavigate()
	const [disable, setDisable] = useState(false)
	const time = organizationStatusModel.timeworkOrganization

	

	const handlerOrder = async () =>{
		try {
			await basketUseCase.checkCartHI()
			!disable && navigate(ROUTE_APP.ORDER.ORDER_MAIN)
			
		} catch (error:any) {
			if (error.response.status === 422 && error.response) {
				basketUseCase.basketModel.actionCheckbasketError(error.response.data.errors)
			}
			if(error.response.status === 401){
				navigate(0)
			}
		}

	}


	return (
		<>
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
			
			<button disabled={disable}  className="btn btn-md btn-red" onClick={handlerOrder}>Оформить</button>
		</div>
		<OrderNotificate disable={setDisable}/>
		</>
		
	)
}
export default observer(BasketOrder)