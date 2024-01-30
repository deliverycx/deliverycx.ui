/* eslint-disable no-irregular-whitespace */
import { NavLink } from "react-router-dom"
import { ROUTE_APP } from 'application/contstans/route.const';
import { TadapterCaseCallback, adapterComponentUseCase } from 'adapters/adapterComponents';
import { useUserOrdersViewModel } from "./UserOrders.viewModel";
import { IUserOrders } from "modules/Profile/interfaces/profile.type";
import UserOrderList from "./UserOrderList";
import React from "react";
import { observer } from "mobx-react-lite";


export const UserOrderContext = React.createContext<TadapterCaseCallback>({
	data: {},
	handlers: {},
	status: {}
});
const HOCUserOrdersDesc = () => {
	const useCase = adapterComponentUseCase(useUserOrdersViewModel)
	const { orderList, organization } = useCase.data
	const { returnOrder } = useCase.handlers

	return (
		<div className="">
			
			<div className="orders__list ">
				<UserOrderContext.Provider value={useCase}>
					{
						orderList ? orderList.map((value: IUserOrders) => {

							return <UserOrderList key={value.order.orderId} order={value} />

						})
							:
							<div className="">
								<div className="unauthorized__content">
									<div className="unauthorized__content-sticker">
										<img src={require("assets/images/delivery/no_addresses.png")} alt="Весёлый хинкалик" />
									</div>
									<div className="unauthorized__content-title">У вас ещё не было заказов… в {organization.info.address}</div>
									<div className="unauthorized__content-text">
										Чтобы совершить свой первый заказ,<br /> выберете себе что‑нибудь вкусное на главной странице
									</div>
									<NavLink to={`${ROUTE_APP.MAIN}`} className="btn btn-md btn-red gap-4">

												На главную
											</NavLink>
								</div>
							</div>
					}
				</UserOrderContext.Provider>
			</div>
			
		</div>
	)
}
export default observer(HOCUserOrdersDesc)