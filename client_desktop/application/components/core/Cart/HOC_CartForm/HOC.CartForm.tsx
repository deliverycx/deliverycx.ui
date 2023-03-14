import { ISubmitData } from "@types";
import submitHandler from "application/helpers/submitFormHandler";
import schema from "application/helpers/validationSchema";
import { useFormik, FormikProvider } from "formik";
import { FC, useState } from "react";
import { useEffect } from 'react';

import { adapterComponentUseCase, TadapterCaseCallback } from 'adapters/adapterComponents';
import { useCartForm } from "domain/use-case/useCaseCart";
import { FormBuilder } from "application/components/common/Forms";

import React from "react";
import Modals from "application/components/common/Modals/Modals";
import CartYmap from "../Presentation/CartYmap";
import { workTimeCheck, workTimeHelp } from "application/helpers/workTime";
import { CART_CHOICE } from "application/contstans/cart.const";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { ORG_STATUS } from 'application/contstans/const.orgstatus';


type IProps = {
  builder: any
  paths:string
}
export const CartFormContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const CartFrom: FC<IProps> = ({ builder,paths }) => {
	const [cxofer, setCXOfer] = useState<boolean>(true);
	const pointstatus = adapterSelector.useSelectors((selector) => selector.pointstatus);
  const useCaseForm = adapterComponentUseCase(useCartForm,paths)
  const {
    city,
		workTime,
		delivMetod,
    selectAddress,
    orderError,
    loadingOrder,
    orderType,
    initialValues,
    paymentMetod,
    showMap
  } = useCaseForm.data
  const {setShowMap} = useCaseForm.handlers

  const formik = useFormik({
    initialValues,
    validationSchema: schema(orderType),
    onSubmit: (values, meta) => {
      submitHandler<ISubmitData>(
        {
          ...values,
          payment_method: paymentMetod.id,
          city: city.name,
          orderType
        },
        meta
      );
      /*
      if (!paymentReady && paymentMetod.id === CartFormMetods.paymentsMetod[1].id) {
        history.push(paths + '/card')
      } else {
        submitHandler<ISubmitData>(
          {
            ...values,
            payment_method: paymentMetod.id,
            paymentOrderCard:paymentOrder,
            times,
            city: city.name,
            orderType
          },
          meta
        );

      }
      */

    },
  });
  const formWrapper = new FormBuilder(formik,useCaseForm);

  useEffect(() => {
    selectAddress && formik.setFieldValue("address", selectAddress)
  },[selectAddress])

  const disabledData = ()=> {
    if(useCaseForm.data.orderType === 'COURIER') {
      return !formik.values.name || !formik.values.address || !formik.values.phone;
    } else if(useCaseForm.data.orderType === 'PICKUP') {
      return !formik.values.name || !formik.values.phone;
    }
  }

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="cart__form">
          {
            formWrapper.getInitinal(builder)
          }
          {
            showMap &&
            <Modals onClose={() => setShowMap(false)} noscrole={true}>
              <CartYmap close={() => setShowMap(false)} />
            </Modals>
          }
          <textarea
            value={formik.values.comment}
            name="comment"
            onChange={formik.handleChange}
            className="form__textarea cart"
            placeholder="Комментарии к заказу"
          ></textarea>
          <div className="row align-center form__create"></div>
        </div>

				<div className="box_checkbox">
					<input className="styled-checkbox" id="styled-checkbox-1" type="checkbox" value="value1" />
    			<label htmlFor="styled-checkbox-1" onClick={()=> setCXOfer(prev => !prev)} ><span>Я согласен на <a href="/images/cx.pdf" download="">обработку персональных данных</a></span></label>
					</div>	


        <div className="cart__order-btnbox">
					{
						workTimeHelp()  && pointstatus.organizationStatus === ORG_STATUS.WORK
						? <button disabled className="order-btn-pointclosed">Хинкальная сейчас закрыта.<br/>
								Оформить заказ вы сможете: {workTimeCheck(workTime)}
							</button>
						: pointstatus.organizationStatus === ORG_STATUS.NODELIVERY
							? <button disabled className="order-btn-pointclosed">Оформление онлайн-заказа недоступно
								
							</button>	
						: <button type="submit" className="cart__order-btn btn" disabled={loadingOrder || disabledData() || !cxofer}>
		              Заказать
		          </button>
					}
          
          {orderError.status === 500 && (
            <div className="server-error">
              Что-то пошло не так
              {
                orderError.error.errors &&
                Array.isArray(orderError.error.errors)
                  ? orderError.error.errors.map((val: string) => {
                    return (
                      <li key={val}>{val}</li>
                    )
                  })
                  : <li>{orderError.error.errors}</li>
              }
            </div>
          )}
        </div>
      </form>
    </FormikProvider>
  );
};
export default CartFrom;
