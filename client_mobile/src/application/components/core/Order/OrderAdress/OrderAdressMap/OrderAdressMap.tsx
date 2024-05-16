import ModalCard from "application/components/common/Modals/ModalCard"
import { ROUTE_APP } from "application/contstans/route.const";
import { observer } from "mobx-react-lite";
import { cityModel } from "modules/CityModule/city.module";
import { orderModel, orderUseCase } from "modules/OrderModule/order.module";
import { IAddressDelivery } from "modules/Profile/interfaces/profile.type";
import { profileModel } from "modules/Profile/profile.module";
import { userModel } from "modules/UserModule/user.module";
import { FC, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom';
import cn from "classnames"
import { Desktop, Mobile, isDesctomMediaQuery } from "application/ResponseMedia";
import { Field } from "formik";

type IProps = {
	formik?: any
}

const OrderAdressMap: FC<IProps> = ({ formik }) => {
	const user = userModel.guestUser
	const { orderDeliveryAddress } = orderModel
	const { profile } = profileModel
	const navigate = useNavigate()
	const city = cityModel.selectCity
	const [isModalDeleteOpened, setIsModalDeleteOpened] = useState(false)
	const [isModalOpened, setIsModalOpened] = useState(false)

	const isdesc = isDesctomMediaQuery()

	const ROUTE = isdesc ? ROUTE_APP.ORDER.ORDER_MAP : ROUTE_APP.MAP.DELIVERY_MAP

	useEffect(() => {
		if (orderDeliveryAddress) {
			formik.setFieldValue('address', `${orderDeliveryAddress.city}, ${orderDeliveryAddress.address} ${orderDeliveryAddress.house}`)

		}
	}, [orderDeliveryAddress])


	const handlerMap = () => {
		if (user && user.phone) {
			setIsModalOpened(true)
		} else {
			if (orderDeliveryAddress) {
				navigate(ROUTE_APP.MAP.DELIVERY_MAP + `/${orderDeliveryAddress.address}${orderDeliveryAddress.house}?query=${JSON.stringify(orderDeliveryAddress)}`)

			} else {
				navigate(ROUTE)
			}

		}

	}

	const handlerSelect = (val: any) => {
		orderUseCase.orderDeliveryAddress(val)
		setIsModalOpened(false)
	}

	const userEditAddes = (address: IAddressDelivery) => {
		navigate(ROUTE + `/${address.address}`)
		setIsModalOpened(false)
	}

	

	return (
		<>
			<div className="adress_fild">
				
				<div className="	input__item input_address">
					<label htmlFor="adresses-delivey">Адрес доставки</label>
					<div className="input__container">
						{
							//input_icon not-valid input_icon_left input_icon_right <img src={require("assets/images/icons/location_gray_999.png")} alt="" />
						}
						{
							orderDeliveryAddress 
							? <input readOnly onClick={handlerMap} placeholder="Нажмите для выбора адреса" value={`${orderDeliveryAddress.city},ул ${orderDeliveryAddress.address}`} name="address" type="text" />
							: <input readOnly onClick={handlerMap} placeholder="Нажмите для выбора адреса" value="" name="address" type="text" />
						}
						
					</div>
				</div>
				<div className="input__item input_house">
					<label htmlFor="entrance">Дом</label>
					<div className="input__container">
						<Field
							className="form__field-wrapper__input gray"
							name="flat"
							placeholder="Дом"
							value={orderDeliveryAddress?.house || ""}
							onClick={handlerMap}
						/>
					</div>
				</div>
				
			</div>
			<div className="adress_fild">

				<div className="d-flex flex-center gap-8">
					<div className="input__item">
						<label htmlFor="entrance">Кв/офис</label>
						<div className="input__container">
							<Field
								className="form__field-wrapper__input gray"
								name="flat"
								placeholder="кв / офис"
								value={orderDeliveryAddress?.flat || ""}
								onClick={handlerMap}
							/>
						</div>
					</div>
					
					<div className="input__item">
						<label htmlFor="entrance">Подъезд</label>
						<div className="input__container">
							<Field
								className="form__field-wrapper__input gray"
								name="entrance"
								placeholder="подъезд"
								value={orderDeliveryAddress?.entrance || ""}
								onClick={handlerMap}
							/>
						</div>
					</div>
					<div className="input__item">
						<label htmlFor="entrance">Этаж</label>
						<div className="input__container">
							<Field
								className="form__field-wrapper__input gray floor"
								name="floor"
								placeholder="этаж"
								value={orderDeliveryAddress?.floor || ""}
								onClick={handlerMap}
							/>
						</div>
					</div>

				</div>
			</div>

			{

				isModalOpened &&
				<>
					<Mobile>
						<ModalCard setIsOpened={() => setIsModalOpened(false)}>
							<div className="modal__wrapper map__institute-info">
								<div className="delivery-addresses__list">
									<div className="delivery-addresses__list__items">
										{
											profile && profile.adressdelivery.length === 0 &&
											<div className="delivery-addresses__list__items-empty">
												<h3>Нет адресов</h3>
												<span>Добавьте адрес доставки для быстрого оформления ваших заказов</span>
											</div>
										}
										{profile && profile.adressdelivery && profile.adressdelivery.map((val) => {
											const CN = cn('delivery-addresses__list__items-item', { active: val.address === orderDeliveryAddress?.address })

											return city?.cityname === val.city &&
												(<div key={val.address} className={CN}>
													<div className="delivery-addresses__list-box" onClick={() => handlerSelect(val)}>

														<div className="order-placement__payment-method__item-btn">
															{
																val.address === orderDeliveryAddress?.address &&
																<img src={require("assets/images/icons/doneok.png")} />
															}
														</div>

														<span> ул. {val.address}, {val.house}</span>
													</div>

													<button className="btn btn-none btn-mini" onClick={() => userEditAddes(val)}>
														<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
															<path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9125 3.075 16.7875C3.125 16.6625 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.3375 20.875 7.2125 20.925C7.0875 20.975 6.95833 21 6.825 21H4ZM14.325 9.675L13.625 8.975L15.025 10.375L14.325 9.675Z" fill="#8D191D" />
														</svg>
													</button>

												</div>
												)
										}
										)}
									</div>

									<div className="delivery-addresses__buttons">
										<button className="btn btn-md btn-red gap-4" onClick={() => navigate(ROUTE)}>

											Добавить новый адрес
										</button>
										<button className="btn btn-md btn-gray" onClick={() => setIsModalOpened(false)}>Закрыть</button>
									</div>
								</div>
							</div>
						</ModalCard>
					</Mobile>
					<Desktop>
						<ModalCard setIsOpened={() => setIsModalOpened(false)} theme={null} styles="order_adressmodal-desc">
							<div className="modal__wrapper map__institute-info">
								<div className="delivery-addresses__list">
									<div className="delivery-addresses__list__items">
										{
											profile && profile.adressdelivery.length === 0 &&
											<div className="delivery-addresses__list__items-empty">
												<h3>Нет адресов</h3>
												<span>Добавьте адрес доставки для быстрого оформления ваших заказов</span>
											</div>
										}
										{profile && profile.adressdelivery && profile.adressdelivery.map((val) => {
											const CN = cn('delivery-addresses__list__items-item', { active: val.address === orderDeliveryAddress?.address })

											return city?.cityname === val.city &&
												(<div key={val.address} className={CN}>
													<div className="delivery-addresses__list-box" onClick={() => handlerSelect(val)}>

														<div className="order-placement__payment-method__item-btn">
															{
																val.address === orderDeliveryAddress?.address &&
																<img src={require("assets/images/icons/doneok.png")} />
															}
														</div>

														<span> ул. {val.address}, {val.house}</span>
													</div>

													<button className="btn btn-none btn-mini" onClick={() => userEditAddes(val)}>
														<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
															<path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9125 3.075 16.7875C3.125 16.6625 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.3375 20.875 7.2125 20.925C7.0875 20.975 6.95833 21 6.825 21H4ZM14.325 9.675L13.625 8.975L15.025 10.375L14.325 9.675Z" fill="#8D191D" />
														</svg>
													</button>

												</div>
												)
										}
										)}
									</div>

									<div className="delivery-addresses__buttons">
										<button className="btn btn-md btn-red gap-4" onClick={() => {
											navigate(ROUTE)
											setIsModalOpened(false)
										}}>

											Добавить новый адрес
										</button>
										<button className="btn btn-md btn-gray" onClick={() => setIsModalOpened(false)}>Закрыть</button>
									</div>
								</div>
							</div>
						</ModalCard>

					</Desktop>

				</>

			}
		</>
	)
}
export default observer(OrderAdressMap) 