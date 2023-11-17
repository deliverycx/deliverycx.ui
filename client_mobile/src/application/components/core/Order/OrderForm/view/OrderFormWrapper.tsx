/* eslint-disable @typescript-eslint/no-var-requires */
import { Field } from "formik";

import InputMask from "react-input-mask";

import { ROUTE_APP } from 'application/contstans/route.const';
import { ReactNode } from 'react';
import FormFieldWrapper from "application/components/common/Forms/FormFieldWrapper";
import { IOrderFormPayMetods, OrderFormPayMetods } from "./OrderFormPayMetods";
import { useNavigate } from "react-router-dom";
import { PAYMENT_METODS } from "application/contstans/const.orgstatus";
import parse from 'html-react-parser'
import OrderOnspotSelect from "../OnspotTable/OrderOnspotSelect";
import HOCOrderOnspotSelect from "../OnspotTable/HOC.OrderOnspotSelect";
import OrderAdressMap from "../../OrderAdress/OrderAdressMap/OrderAdressMap";
import cn from "classnames"

export interface IWrapper {
	paymentPopup(): ReactNode
	payment(metods: any): ReactNode
	adress(): ReactNode
	name(): ReactNode
	phone(): ReactNode
	deliv(): ReactNode
	onspotSelect():ReactNode
	selectdeliv(): ReactNode
	deliveryTime(): ReactNode
	comment(): ReactNode
}
export const OrderFormWrapper = (formik: any, usecase: any): IWrapper => {
	const navigate = useNavigate()
	const { selectDeliveryTipe,selectOrganization, paymentMetod } = usecase.data


	return {
		paymentPopup() {

			/*
			const img = 
			OrderFormPayMetods.paymentsMetod[0].id === paymentMetod.id ? "cash.png" :
			OrderFormPayMetods.paymentsMetod[1].id === paymentMetod.id ? "card-red.svg" :
			OrderFormPayMetods.paymentsMetod[2].id === paymentMetod.id ? "paymaster.png" : "card-red.svg"
			*/
			return (
				<div className="adress_fild">
					<div className="form__field-wrapper__title">Способ оплаты</div>
					<FormFieldWrapper
						placeholderIco={""}
						placeholderValue="Оплата"
						addfild="payfild"
					>
						{
							paymentMetod &&
							<div className="adress_fild__address payment-fild" >{paymentMetod.value} <span className="ok-icon-red"></span></div>
						}


					</FormFieldWrapper>
				</div>
			)
		},
		payment(paymentsMetod) {



			return (
				

				<div className="order-placement__payment-method">
					<h2 className="order-placement__payment-method-title">Способ оплаты</h2>
					
					{
						paymentsMetod &&
						paymentsMetod.map((value: any) => {
							const CN = cn('order-placement__payment-method__item',{active:formik.values.payment === value.id})
							return (
								<div key={value.id} onClick={() => formik.setFieldValue('payment', value.id)} className={CN}>
									<div className="order-placement__payment-method-box">
									{parse(value.icon)}
										<div className="order-placement__payment-method__item-name">{value.value}</div>
										{
											formik.values.payment === value.id &&
											<img src={require("assets/images/icons/doneok.png")} />
										}
										
									</div>
									{
										formik.values.payment === PAYMENT_METODS.CASH && value.id === PAYMENT_METODS.CASH &&
										<div className="input__item">
											<label htmlFor="change">С какой суммы подготовить сдачу?</label>
											<div className="input__container">
												<input placeholder="Введите сумму" name="change" value={formik.values.money !== 0 ? formik.values.money : ''} defaultValue={formik.values.money !== 0 ? formik.values.money : ''} onChange={e => formik.setFieldValue('money', e.target.value)} type="text" />
												<a className="btn btn-none nomoney" onClick={() => formik.setFieldValue('money', 0)}>Без сдачи</a>
											</div>
										</div>
									}

								</div>
							)
						})

					}


				</div>

			);
		},
		deliv() {
			return (
				<FormFieldWrapper
					placeholderIco={""}
					placeholderValue="Доставка"
					isValid={
						!formik.values.deliv.length || formik.errors.deliv
					}
					error={!!(formik.errors.deliv && formik.touched.deliv)}
					errorValue={formik.errors.deliv}
				>
					<label htmlFor="adresses-delivey">Адрес доставки</label>
					
				</FormFieldWrapper>
			)
		},
		selectdeliv() {
			return (

				<FormFieldWrapper
					placeholderIco={""}
					placeholderValue="Где"

					error={!!formik.errors.address || !!formik.errors.house}
					errorValue={formik.errors.address || formik.errors.house}
				>
					<label htmlFor="adresses-delivey">Адрес доставки</label>
					<OrderAdressMap formik={formik} />

				</FormFieldWrapper>

			)
		},
		onspotSelect(){
			return(
				<FormFieldWrapper
					placeholderIco={""}
					placeholderValue="Где"

					error={!!formik.errors.timedelivery || !!formik.errors.timedelivery}
					errorValue={formik.errors.timedelivery || formik.errors.timedelivery}
				>
					{

						<HOCOrderOnspotSelect deliveryType={selectDeliveryTipe} organization={selectOrganization} />
					}
					
				</FormFieldWrapper>
			)
		},
		deliveryTime() {
			return (

				<FormFieldWrapper
					placeholderIco={""}
					placeholderValue="Где"

					error={!!formik.errors.timedelivery || !!formik.errors.timedelivery}
					errorValue={formik.errors.timedelivery || formik.errors.timedelivery}
				>
					<div className="input__item input_icon input_icon_left input_icon_right">
						<label htmlFor="time-delivey">Время доставки</label>
						<div className="input__container">
							<img src={require("assets/images/icons/timer_gray_999.png")} alt="" />
							<Field
								className="form__field-wrapper__input gray"
								name="timedelivery"
								placeholder="В ближайшее время"
								value={formik.values.timedelivery}
								onChange={formik.handleChange}
							/>
						</div>
					</div>

				</FormFieldWrapper>

			)
		},
		adress() {
			return (
				<div className="adress_fild">
					{
						/*
					<div className="form__field-wrapper__title">Адрес доставки</div>
					<FormFieldWrapper
						placeholderIco={require("assets/i/cart/mark-dark.svg").default}
						placeholderValue="Где"
						isValid={!formik.values.address.length}
						error={!!formik.errors.address}
						errorValue={formik.errors.address}
					>
						
	
						
						<div className="adress_fild__address" onClick={() => history.push(ROUTE_APP.CART.CART_MAP)}>
							{formik.values.address.length
								? formik.values.address
								: "Выберете адрес"}
						</div>
					</FormFieldWrapper>
					*/
					}
					<div className="d-flex flex-center gap-8">
						<div className="input__item">
							<label htmlFor="entrance">Кв/офис</label>
							<div className="input__container">
								<Field
									className="form__field-wrapper__input gray"
									name="flat"
									placeholder="кв / офис"
									value={formik.values.flat}
									onChange={formik.handleChange}
								/>
							</div>
						</div>
						<div className="input__item">
							<label htmlFor="entrance">Домофон</label>
							<div className="input__container">
								<Field
									className="form__field-wrapper__input gray"
									name="intercom"
									placeholder="домофон"
									value={formik.values.intercom}
									onChange={formik.handleChange}
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
									value={formik.values.entrance}
									onChange={formik.handleChange}
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
									value={formik.values.floor}
									onChange={formik.handleChange}
								/>
							</div>
						</div>

					</div>
				</div>
			)
		},
		name() {
			return (

				<FormFieldWrapper
					placeholderIco={""}
					placeholderValue="Контакты"
					isValid={
						!formik.values.name.length || formik.errors.name
					}
					error={!!(formik.errors.name && formik.touched.name)}
					errorValue={formik.errors.name}
					addfild={"input_icon_left input_icon_right"}
				>
					<label htmlFor="user">Получатель</label>
					<div className="input__container">
						<img src={require("assets/images/icons/person.png")} alt="" />
						<Field
							className="form__field-wrapper__input"
							name="name"
							placeholder="Ваше имя"
							value={formik.values.name}
							onChange={formik.handleChange}
						/>
					</div>

				</FormFieldWrapper>
			)
		},
		phone() {
			return (
				<FormFieldWrapper
					placeholderIco={""}
					placeholderValue="Телефон"
					isValid={
						!formik.values.phone.length || formik.errors.phone
					}
					error={!!(formik.errors.phone && formik.touched.phone)}
					errorValue={formik.errors.phone}
					addfild={"input_icon_left input_icon_right"}
				>
					<div className="input__container">
						<img src={require("assets/images/icons/phone_gray.png")} alt="" />
						<Field
							name="phone"
							render={({ field }: any) => (
								<InputMask
									{...field}
									mask="+7 999 999 99 99"
									maskPlaceholder={null}
									className="form__field-wrapper__input"
									placeholder="+7"
									value={formik.values.phone}
									onChange={formik.handleChange}
								/>
							)}
						/>
					
					</div>

				</FormFieldWrapper>
			)
		},
		comment() {
			return (
				<div className="input__item">
					<label htmlFor="comment">Комментарий к заказу</label>
					<div className="input__container">
						<textarea
							value={formik.values.comment}
							name="comment"
							onChange={formik.handleChange}
							className="form__textarea"
							placeholder={`Вы можете добавить примечание	\nк заказу`}
						></textarea>
					</div>
				</div>

			)
		}
	};
};


