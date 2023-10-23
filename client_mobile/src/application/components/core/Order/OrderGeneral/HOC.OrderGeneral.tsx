import { observer } from "mobx-react-lite"
import { basketModel, basketUseCase } from "modules/BasketModule/basket.module"
import { orderModel } from "modules/OrderModule/order.module"
import { organizationStatusModel, useCaseOrganization } from "modules/OrganizationModule/organization.module"
import { OrderFormPayMetods } from "../OrderForm/view/OrderFormPayMetods"
import { DELIVERY_METODS, PAYMENT_METODS } from "application/contstans/const.orgstatus"
import { FC } from "react"
import OrderGeneralErrors from "./OrderGeneralErrors"

const HOCOrderGeneral:FC<{errors:any}> = ({errors}) => {
	const { cart, basketPrice } = basketModel
	const { orderBody } = orderModel
	const { selectDeliveryTipe } = organizationStatusModel
	const city = useCaseOrganization.cityModel.selectCity



	return (
		<div className="order-placement__check">
			<div className="order-placement__check__info">
				<h2 className="order-placement__check__info-title">Ваш заказ</h2>
				<div className="order-placement-remained__content__list order-placement__check__info__list">
					{cart && cart.map((value, i) => (
						<div key={i} className="order-placement-remained__content__list__item">
							<div className="order-placement-remained__content__list__item__info">
								<div className="order-placement-remained__content__list__item__info-title">{value.productName}</div>
								<div className="order-placement-remained__content__list__item__info-cost price--cost">

									<h5>{value.price} ₽</h5>
								</div>
							</div>
							<div className="order-placement-remained__content__list__item-price">
								{value.oneprice}₽  {value.amount !== 1 && `× ${value.amount} шт.`}
							</div>
						</div>
					))}
				</div>
				<div className="order-placement__check__info__price">
					<h3 className="order-placement__check__info__price-title">Стоимость заказа</h3>
					<div className="order-placement__check__info__price-cost price--cost">

						<h3>{basketPrice?.totalPrice} ₽</h3>
					</div>
				</div>


				{
					selectDeliveryTipe?.metod === DELIVERY_METODS.COURIER ?
						<div className="order-placement__check__info__delivery">
							<div className="order-placement__check__info__delivery__price">
								<h3 className="order-placement__check__info__delivery__price-title">Доставка</h3>
								<div className="order-placement__check__info__delivery__price-cost">
									{
										basketPrice?.deliveryPrice === 0 ? <span>Бесплатно</span> : <span>{basketPrice?.deliveryPrice}₽</span>
									}

								</div>
							</div>


							<div className="order-placement__check__info__delivery__info">
								<div className="order-placement__check__info__delivery__info-time">{orderBody.timedelivery || "В ближайшее время"}</div>
								<div className="order-placement__check__info__delivery__info-contact">{orderBody.name} {orderBody.phone}</div>
								<div className="order-placement__check__info__delivery__info-addresses">{orderBody.address && `${orderBody.address},`}{city?.cityname}</div>
								{
									basketPrice?.deltaPrice !== 0 &&
									<div className="order-placement__check__info__delivery__info-additional">
										<img src={require("assets/images/icons/info_green.png")} alt="" />
										Для бесплатной доставки добавьте ещё на
										<span>{basketPrice?.deltaPrice} ₽</span>
									</div>
								}

							</div>
						</div>
						: selectDeliveryTipe?.metod === DELIVERY_METODS.PICKUP ?
							<div className="order-placement__check__info__delivery">
								<div className="order-placement__check__info__delivery__price">
									<h3 className="order-placement__check__info__delivery__price-title">Самовывоз</h3>

								</div>
							</div>
							: selectDeliveryTipe?.metod === DELIVERY_METODS.ONSPOT ?
								<div className="order-placement__check__info__delivery">
									<div className="order-placement__check__info__delivery__price">
										<h3 className="order-placement__check__info__delivery__price-title">За столиком</h3>

									</div>
								</div>
								: ""
				}






				<div className="order-placement__check__info__total">
					<h2 className="order-placement__check__info__total-title">Итого</h2>
					<div className="order-placement__check__info__total-cost price--cost">
						<h2>{basketPrice?.totalPrice} ₽</h2>
					</div>
				</div>
				{
					selectDeliveryTipe?.metod === DELIVERY_METODS.COURIER &&
					<div className="order-placement__check__info__payment">
						<h3 className="order-placement__check__info__payment-title">Оплата</h3>
						<div className="order-placement__check__info__payment__info">
							<div className="order-placement__check__info__payment__info__item">
								<div className="order-placement__check__info__payment__info__item-name">{OrderFormPayMetods.paymentsMetod.map((val) => val.id == orderBody.payment && val.value)}</div>
								{
									orderBody.payment === PAYMENT_METODS.CASH && orderBody.money !== 0 &&
									<div className="order-placement__check__info__payment__info__item-cost">{orderBody.money} ₽</div>
								}

							</div>
							{
								orderBody.payment === PAYMENT_METODS.CASH && orderBody.money !== 0 && basketPrice &&
								<div className="order-placement__check__info__payment__info__item">
									<div className="order-placement__check__info__payment__info__item-name">Сдача</div>
									<div className="order-placement__check__info__payment__info__item-cost">{orderBody.money - basketPrice.totalPrice > 0 ? `${orderBody.money - basketPrice.totalPrice} ₽` : "Без сдачи"}</div>
								</div>
							}

						</div>
					</div>
				}
				{
					errors && <OrderGeneralErrors error={errors} />
				}
			</div>
		</div>
	)
}
export default observer(HOCOrderGeneral)