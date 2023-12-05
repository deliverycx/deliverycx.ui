/* eslint-disable no-irregular-whitespace */
import { NavLink } from "react-router-dom"
import { ROUTE_APP } from 'application/contstans/route.const';
import { TadapterCaseCallback, adapterComponentUseCase } from 'adapters/adapterComponents';
import { useUserOrdersViewModel } from "./UserOrders.viewModel";
import { IUserOrders } from "modules/Profile/interfaces/profile.type";
import UserOrderList from "./UserOrderList";
import React from "react";

export const UserOrderContext = React.createContext<TadapterCaseCallback>({
	data: {},
	handlers: {},
	status: {}
});
const HOCUserOrders = () => {
	const useCase = adapterComponentUseCase(useUserOrdersViewModel)
	const { orderList, organization } = useCase.data
	const { returnOrder } = useCase.handlers

	return (
		<div className="orders authorized">
			<div className="top-bar">
				<div className="top-bar__left">
					<div className="top-bar__icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 17C8.28333 17 8.52083 16.9042 8.7125 16.7125C8.90417 16.5208 9 16.2833 9 16C9 15.7167 8.90417 15.4792 8.7125 15.2875C8.52083 15.0958 8.28333 15 8 15C7.71667 15 7.47917 15.0958 7.2875 15.2875C7.09583 15.4792 7 15.7167 7 16C7 16.2833 7.09583 16.5208 7.2875 16.7125C7.47917 16.9042 7.71667 17 8 17ZM8 13C8.28333 13 8.52083 12.9042 8.7125 12.7125C8.90417 12.5208 9 12.2833 9 12C9 11.7167 8.90417 11.4792 8.7125 11.2875C8.52083 11.0958 8.28333 11 8 11C7.71667 11 7.47917 11.0958 7.2875 11.2875C7.09583 11.4792 7 11.7167 7 12C7 12.2833 7.09583 12.5208 7.2875 12.7125C7.47917 12.9042 7.71667 13 8 13ZM8 9C8.28333 9 8.52083 8.90417 8.7125 8.7125C8.90417 8.52083 9 8.28333 9 8C9 7.71667 8.90417 7.47917 8.7125 7.2875C8.52083 7.09583 8.28333 7 8 7C7.71667 7 7.47917 7.09583 7.2875 7.2875C7.09583 7.47917 7 7.71667 7 8C7 8.28333 7.09583 8.52083 7.2875 8.7125C7.47917 8.90417 7.71667 9 8 9ZM12 17H16C16.2833 17 16.5208 16.9042 16.7125 16.7125C16.9042 16.5208 17 16.2833 17 16C17 15.7167 16.9042 15.4792 16.7125 15.2875C16.5208 15.0958 16.2833 15 16 15H12C11.7167 15 11.4792 15.0958 11.2875 15.2875C11.0958 15.4792 11 15.7167 11 16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM12 13H16C16.2833 13 16.5208 12.9042 16.7125 12.7125C16.9042 12.5208 17 12.2833 17 12C17 11.7167 16.9042 11.4792 16.7125 11.2875C16.5208 11.0958 16.2833 11 16 11H12C11.7167 11 11.4792 11.0958 11.2875 11.2875C11.0958 11.4792 11 11.7167 11 12C11 12.2833 11.0958 12.5208 11.2875 12.7125C11.4792 12.9042 11.7167 13 12 13ZM12 9H16C16.2833 9 16.5208 8.90417 16.7125 8.7125C16.9042 8.52083 17 8.28333 17 8C17 7.71667 16.9042 7.47917 16.7125 7.2875C16.5208 7.09583 16.2833 7 16 7H12C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z" fill="#8D191D" /></svg>
					</div>
					<h3>Заказы</h3>
				</div>
			</div>
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
								</div>
							</div>
					}
				</UserOrderContext.Provider>
			</div>
			<div className="orders__button">
				<NavLink to={ROUTE_APP.PROFILE.PROFILE_MAIN} className="btn btn-md btn-red">Назад</NavLink>
			</div>
		</div>
	)
}
export default HOCUserOrders