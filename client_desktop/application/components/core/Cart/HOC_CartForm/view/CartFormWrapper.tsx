/* eslint-disable react/jsx-no-comment-textnodes */

import { Field } from "formik";
import FormFieldWrapper from "../../../../common/Forms/FormFieldWrapper";
import InputMask from "react-input-mask";
import { ROUTE_APP } from 'application/contstans/route.const';
import { ReactNode } from 'react';
import FormSelect from "../../../../common/Forms/FormSelect";
import { IPayment } from "@types";
import { ICartFormMetods } from "../CartMetods";
import cn from "classnames";
import CartAdresSelect from "./CartAdresSelect";

export interface IWrapper {
  paymentPopup(): ReactNode
  payment(metods:any):ReactNode
  paymentRadio(paymentsMetod:any): ReactNode
  adress(): ReactNode
	selectdeliv(): ReactNode
  name(): ReactNode
  phone(): ReactNode
  deliv(): ReactNode
}
export const FormWrapper = (formik: any,usecase?:any): IWrapper => {
  const { stateForm,paths,paymentMetod } = usecase.data
  const { selectPayment, choicePayment,setShowMap } = usecase.handlers

  return {
    paymentPopup() {

      return (
        <FormFieldWrapper
          placeholderIco="images/i/card-red.svg"
          placeholderValue="Оплата"
          addfild="addfild"
        >
          <div className="adress_fild__address" onClick={choicePayment}>{paymentMetod.value}</div>
          {
            //CartFormMetods.paymentsMetod[1].id === stateForm.payment.id
            false &&
            <div className="addnew_cart" >
              <img src="images/i/credit_card.png" />
              <span>Добавить новую карту</span>
            </div>
          }

        </FormFieldWrapper>
      )
    },
    paymentRadio(paymentsMetod) {

      return (
        <div className="fild__box">
					<div className="fild-lable">Способ оплаты</div>
          <div className="payment_list">
            {
              paymentsMetod.map((metod: IPayment, index: number) => {
                const CN = cn("payment_list-item", { active: paymentMetod.id  == metod.id})
                return (
                  <div key={index} className={CN} onClick={() => selectPayment(metod)}>
      							<input className="custom-radio" name="pay" defaultChecked={paymentMetod.id  == metod.id} type="radio" id={metod.id} value="green"/>
      							<label htmlFor={metod.id} className="payment_list-item--name">
      								<img src={metod.icon} alt="" />
      								<span>{metod.value}</span>
      							</label>
                  </div>
                )
              })
            }


          </div>

				</div>
      )
    },
    payment(paymentsMetods) {
      return (
          <FormFieldWrapper
              placeholderIco="images/i/card-red.svg"
              placeholderValue="Оплата"
          >
              <FormSelect
                  options={paymentsMetods}
                  selected={paymentMetod}
                  setter={(payment: IPayment) => selectPayment(payment)}
              />
          </FormFieldWrapper>
      );
    },
		selectdeliv(){
			return(
				<div className="adress_fild">
					<div className="form__field-wrapper__title">Адрес доставки</div>
				<FormFieldWrapper
          placeholderIco="images/i/mark-red.svg"
         
          isValid={!formik.values.address.length || !formik.values.house.length}
          error={!!formik.errors.address || !!formik.errors.house}
          errorValue={formik.errors.address || formik.errors.house}
        >
					
					<CartAdresSelect formik={formik} />
				</FormFieldWrapper>
				</div>
			)
		},
    deliv() {
      return (
        <FormFieldWrapper
          placeholderIco="images/i/delev.svg"
          placeholderValue="Доставка"
          isValid={
            !formik.values.deliv.length || formik.errors.deliv
          }
          error={!!(formik.errors.deliv && formik.touched.deliv)}
          errorValue={formik.errors.deliv}
        >
          <div className="adress_fild__address" >
            доставка
          </div>
        </FormFieldWrapper>
      )
    },
    adress() {

      return(
      <div className="adress_fild cart">
				{
					/**
					 * <FormFieldWrapper
          placeholderIco="images/i/mark-red.svg"
          placeholderValue="Адрес доставки"
          isValid={!formik.values.address.length}
          error={!!formik.errors.address}
          errorValue={formik.errors.address}
        >
          <div className="adress_fild__address" onClick={() => setShowMap(true)}>
            {formik.values.address.length
              ? formik.values.address
              : "Выберете адрес"}
          </div>
        </FormFieldWrapper>
					 */
				}
       
				
        <div className="row justify-around from__box-adress">
          <Field
            className="form__field-wrapper__input gray"
            name="flat"
            placeholder="Кв./Офис"
            value={formik.values.flat}
            onChange={formik.handleChange}
          />
          <Field
            className="form__field-wrapper__input gray"
            name="intercom"
            placeholder="Домофон"
            value={formik.values.intercom}
            onChange={formik.handleChange}
          />
          <Field
            className="form__field-wrapper__input gray"
            name="entrance"
            placeholder="Подъезд"
            value={formik.values.entrance}
            onChange={formik.handleChange}
          />
          <Field
            className="form__field-wrapper__input gray"
            name="floor"
            placeholder="Этаж"
            value={formik.values.floor}
            onChange={formik.handleChange}
          />
        </div>
        </div>
      )
    },
    name() {
      return(
      <FormFieldWrapper
        placeholderIco="images/i/profile-red.svg"
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
      )
    },
    phone() {
      return(
      <FormFieldWrapper
        placeholderIco="images/i/phone-red.svg"
        placeholderValue=""
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
  };
};


