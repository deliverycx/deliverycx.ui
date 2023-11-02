import { IUserOrders } from "modules/Profile/interfaces/profile.type"
import { FC, useContext } from "react"
import OrderStatus from "./OrderStatus"
import { DELIVERY_METODS, PAYMENT_METODS } from "application/contstans/const.orgstatus"
import { orderUseCase } from "modules/OrderModule/order.module"
import { useNavigate } from "react-router-dom"
import { ROUTE_APP } from 'application/contstans/route.const';
import { basketModel } from "modules/BasketModule/basket.module"
import { organizationModel, organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { UserOrderContext } from "./HOC.UserOrders"

type IProps = {
	set: any
	data: IUserOrders
}

const UserOrderCard: FC<IProps> = ({ set, data }) => {
	const useCasePoints = useContext(UserOrderContext)
	const {returnOrder} = useCasePoints.handlers

	return (
		<div className="modal">
			<div className="modal__wrapper">
				<div className="modal__header">
					<div className="modal__header-btn no-drag" onClick={() => set(false)}>
						<img src={require("assets/images/icons/close.png")} alt="" />
					</div>
					<h3>Заказ №{data.order.orderNumber}</h3>
				</div>
				<div className="orders__modal__content">
					<div className="orders__modal__content-info">
						{data.order.orderParams.date}
						<OrderStatus status={data.order.orderStatus} />
					</div>
					<div className="orders__modal__content__list">
						{data.order.orderItems.map(value => (
							<div key={value.id} className="orders__modal__content__list__item">
								<div className="orders__modal__content__list__item__name">
									<div className="orders__modal__content__list__item__name-title">
										{value.productName}
									</div>
									<div className="orders__modal__content__list__item__name-cost price--cost">

										<h5>{value.price} ₽</h5>
									</div>
								</div>
								<div className="orders__modal__content__list__item-price">
									{value.oneprice}₽  {value.amount !== 1 && `× ${value.amount} шт.`}
								</div>
							</div>
						))}
					</div>

					<div className="orders__modal__content__delivery">
						<div className="orders__modal__content__delivery__price">


							{
								data.order.orderParams.orderType === DELIVERY_METODS.COURIER
									?
									<div className="orders__modal__content__delivery__info">
										Доставка
										<div className="orders__modal__content__delivery__info-time">
											время доставки - {data.order.orderParams.timedelivery}
										</div>
										<div className="orders__modal__content__delivery__info-contact">
											{data.order.orderParams.name}, {data.order.orderParams.phone}
										</div>
										<div className="orders__modal__content__delivery__info-addresses">
											{data.order.orderParams.address.street} {data.order.orderParams.address.home}
										</div>
									</div>
									: data.order.orderParams.orderType === DELIVERY_METODS.PICKUP
										? "Самовывоз"
										: data.order.orderParams.orderType === DELIVERY_METODS.ONSPOT
											?

											<div className="orders__modal__content__delivery__info">
												За столиком
												<div className="orders__modal__content__delivery__info-time">
													номер стола - {data.order.orderParams.orderTable?.numb}
												</div>

											</div>
											: ""
							}

						</div>


						<div className="orders__modal__content__payment">
							<div className="orders__modal__content__payment-title">
								Оплата
							</div>
							<div className="orders__modal__content__payment__info">
								<div className="orders__modal__content__payment__info__price">
									<div className="orders__modal__content__payment__info__price-title">
										{
											data.order.orderParams.paymentMethod === PAYMENT_METODS.CASH
												? "Наличными"
												: data.order.orderParams.paymentMethod === PAYMENT_METODS.CARD
													? "Картой курьеру"
													: data.order.orderParams.paymentMethod === PAYMENT_METODS.BYCARD
														? "Оплата в приложении"
														: ""
										}
									</div>

								</div>

							</div>
						</div>
						<div className="orders__modal__content__total">
							Итого
							<div className="orders__modal__content__total-cost price--cost">

								<h2>{data.order.orderParams.orderAmount} ₽</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="orders__modal__buttons" onClick={() => returnOrder(data)}>
					<button className="btn btn-red btn-icon-modal no-drag">
						<img src={require("assets/images/icons/refresh.png")} alt="" />
						Повторить заказ
					</button>
					<button className="btn btn-none btn-icon-modal no-drag" onClick={() => set(false)}>

						Назад
					</button>
				</div>
			</div>
		</div>
	)
}
export default UserOrderCard