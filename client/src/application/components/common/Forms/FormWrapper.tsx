/* eslint-disable @typescript-eslint/no-var-requires */
import { Field } from "formik";
import FormFieldWrapper from "./FormFieldWrapper";
import InputMask from "react-input-mask";
import { useHistory } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { ReactNode } from 'react';
import FormSelect from "./FormSelect";
import { IPayment } from "@types";
import { CartFormMetods } from "application/components/core/Cart/CartForm/CartMetods";

export interface IWrapper {
  paymentPopup(): ReactNode
  payment(metods:any):ReactNode
  adress(): ReactNode
  name(): ReactNode
  phone(): ReactNode
  deliv(): ReactNode
	comment(): ReactNode
}
export const FormWrapper = (formik: any,usecase:any): IWrapper => {
  const history = useHistory()
  const { stateForm,paths,paymentMetod } = usecase.data
  const { selectPayment, choicePayment } = usecase.handlers
  return {
    paymentPopup() {
			
			const img = 
				CartFormMetods.paymentsMetod[0].id === paymentMetod.id ? "cash.png" :
				CartFormMetods.paymentsMetod[1].id === paymentMetod.id ? "card-red.svg" :
				CartFormMetods.paymentsMetod[2].id === paymentMetod.id ? "paymaster.png" : "card-red.svg"

      return (
				<div className="adress_fild">
					<div className="form__field-wrapper__title">Способ оплаты</div>
        <FormFieldWrapper
          placeholderIco={require(`assets/i/${img}`).default}
          placeholderValue="Оплата"
          addfild="payfild"
        >
          <div className="adress_fild__address payment-fild" onClick={choicePayment}>{paymentMetod.value} <span className="ok-icon-red"></span></div>
          {
            //CartFormMetods.paymentsMetod[1].id === stateForm.payment.id
            false &&
            <div className="addnew_cart" onClick={() => history.push(paths + '/card') }>
              <img src={require("assets/i/credit_card.png").default} />
              <span>Добавить новую карту</span>
            </div>
          }

        </FormFieldWrapper>
				</div>
      )
    },
    payment(paymentsMetod) {
			
			

      return (
          <FormFieldWrapper
              placeholderIco={require("assets/i/card-red.svg").default}
              placeholderValue="Оплата"
          >
              <FormSelect
                  options={paymentsMetod}
                  selected={stateForm.payment}
                  setter={(payment: IPayment) => selectPayment(payment)}
              />
          </FormFieldWrapper>
      );
    },
    deliv() {
      return (
        <FormFieldWrapper
          placeholderIco={require("assets/i/delev.svg").default}
          placeholderValue="Доставка"
          isValid={
            !formik.values.deliv.length || formik.errors.deliv
          }
          error={!!(formik.errors.deliv && formik.touched.deliv)}
          errorValue={formik.errors.deliv}
        >
          <div className="adress_fild__address" onClick={() => history.push("/cart/delivery/pop")}>
            доставка
          </div>
        </FormFieldWrapper>
      )
    },
    adress() {
      return(
      <div className="adress_fild">
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
        <div className="row justify-between from__box-adress">
          <Field
            className="form__field-wrapper__input gray"
            name="flat"
            placeholder="кв / офис"
            value={formik.values.flat}
            onChange={formik.handleChange}
          />
          <Field
            className="form__field-wrapper__input gray"
            name="intercom"
            placeholder="домофон"
            value={formik.values.intercom}
            onChange={formik.handleChange}
          />
          <Field
            className="form__field-wrapper__input gray"
            name="entrance"
            placeholder="подъезд"
            value={formik.values.entrance}
            onChange={formik.handleChange}
          />
          <Field
            className="form__field-wrapper__input gray floor"
            name="floor"
            placeholder="этаж"
            value={formik.values.floor}
            onChange={formik.handleChange}
          />
        </div>
        </div>
      )
    },
    name() {
      return(
          <>
            <div className="form__field-wrapper__title">Контакты</div>
            <FormFieldWrapper
                placeholderIco={require("assets/i/cart/person-dark.svg").default}
                placeholderValue="Контакты"
                isValid={
                    !formik.values.name.length || formik.errors.name
                }
                error={!!(formik.errors.name && formik.touched.name)}
                errorValue={formik.errors.name}
            >
              <Field
                  className="form__field-wrapper__input"
                  name="name"
                  placeholder="Ваше имя"
                  value={formik.values.name}
                  onChange={formik.handleChange}
              />
            </FormFieldWrapper>
          </>
      )
    },
    phone() {
      return(
      <FormFieldWrapper
        placeholderIco={require("assets/i/cart/phone-dark.svg").default}
        placeholderValue="Телефон"
        isValid={
          !formik.values.phone.length || formik.errors.phone
        }
        error={!!(formik.errors.phone && formik.touched.phone)}
        errorValue={formik.errors.phone}
      >
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
        </FormFieldWrapper>
      )
    },
		comment(){
			return(
				<textarea
            value={formik.values.comment}
            name="comment"
            onChange={formik.handleChange}
            className="form__textarea"
            placeholder="Напишите сюда, если хотите добавить еще какую-то информацию о заказе..."
          ></textarea>
			)
		}
  };
};


