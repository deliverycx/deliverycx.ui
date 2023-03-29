/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
import { IInitialValues, ISubmitData } from "@types";
import submitHandler from "application/helpers/submitFormHandler";
import schema from "application/helpers/validationSchema";
import { useFormik, FormikProvider } from "formik";
import { debounce } from "lodash";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { useDispatch } from 'react-redux';
import { fetchDeleteCart, setErrors } from "servises/redux/slice/cartSlice";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { adapterComponentUseCase, TadapterCaseCallback } from 'adapters/adapterComponents';
import { useCartForm } from "domain/use-case/useCaseCart";
import { FormBuilder } from "application/components/common/Forms";
import CartModals from "../CartModals/CartModals";
import React from "react";
import { CartFormMetods } from "./CartMetods";
import { DELIVERY_METODS } from "application/contstans/const.orgstatus";
import { useOrderCheck } from "domain/use-case/useCaseOrder/useCase.OrderCheck";

/**/
export const DefaultinitialValues: IInitialValues = {
	comment: "",
	address: "",
	flat: "",
	intercom: "",
	entrance: "",
	floor: "",
	name: "",
	phone: "",
	kladrid: ""
};

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
  const history = useHistory()
  const dispatch = useDispatch()
  const { isVerify, ...user } = useSelector(
    (state: RootState) => state.profile
  );
  const { city } = useSelector((state: RootState) => state.location.point);
  const {orderInfo,orderError,orderNumber,loadingOrder,orderType} = useSelector((state: RootState) => state.cart);
  const errors:any = []
 
  //mocki array


	const [cxofer, setCXOfer] = useState<boolean>(true);
  const useCaseForm = adapterComponentUseCase(useCartForm,paths)
  const {paymentMetod,paymentOrder } = useCaseForm.data
  const { paymentReady } = useCaseForm.status

	const useCaseOrderCheck = adapterComponentUseCase(useOrderCheck)
	const {handlerSubmitOrder} =	useCaseOrderCheck.handlers

	const initialValues: IInitialValues = orderInfo
  const formik = useFormik({
    initialValues,
    validationSchema: schema(orderType),
    onSubmit: (values, meta) => {
			handlerSubmitOrder(values)
			/*
      submitHandler<ISubmitData>(
        {
          ...values,
          payment_method: paymentMetod.id,
          paymentOrderCard:paymentOrder,
          city: city.name,
          orderType
        },
        meta
      );
			*/	

    },
  });
  const formWrapper = new FormBuilder(formik,useCaseForm);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const debounceClearHandler = debounce(() => {
    dispatch(fetchDeleteCart())
  }, 400);

  useEffect(() => {
    orderError.status && dispatch(setErrors({errors:{}}))
		
  },[])


  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="cart__form container">
          {
            formWrapper.getInitinal(builder)
          }

					<div className="box_checkbox">
						<input className="styled-checkbox" id="styled-checkbox-1" type="checkbox" value="value1" />
	    			<label htmlFor="styled-checkbox-1" onClick={()=> setCXOfer(prev => !prev)} ><span>Я согласен на <a href={require("assets/i/cx.pdf").default} download="">обработку персональных данных</a></span></label>
					</div>
          
					{
						orderType === DELIVERY_METODS.ONSPOT 
							? <div className="administrator">После заказа к вам подойдет официант</div>
							: <div className="administrator">После заказа с вами свяжется администратор</div>
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
					
          <div className="form__create">
            <div className="clear" onClick={debounceClearHandler}>
              <img
                src={require("assets/i/clear_cart.svg").default}
                alt="Очистить корзину"
              />
            </div>
            <button
              type="submit"
              className="cart__order-btn btn"
              disabled={loadingOrder || cxofer}
            >
              Заказать
            </button>
          </div>
          <CartFormContext.Provider value={useCaseForm}>
            <CartModals paths={paths} />
          </CartFormContext.Provider>
        </div>
      </form>
    </FormikProvider>
  );
};
export default CartFrom;
