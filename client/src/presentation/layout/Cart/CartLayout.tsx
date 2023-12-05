/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-var-requires */
import CartChoise from "application/components/core/Cart/CartChoice";
import CartList from "application/components/core/Cart/CartBasket/CartList";
import CartTotal from "application/components/core/Cart/CartBasket/CartTotal";
import CartHeader from "presentation/viewModel/viewCart/CartHeader";
import React, { FC, ReactNode } from "react";
import CartDeliveryPrice from "application/components/core/Cart/CartBasket/CartDeliveryPrice";
import { workTimeCheck, workTimeHelp } from "application/helpers/workTime";
import Discounts from "application/components/core/Cart/CartBasket/HOC_Discount";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { CART_CHOICE } from "application/contstans/cart.const";
import DeliveryCost from "../../../application/components/core/Cart/CartBasket/DeliveryCost";
import { ORG_STATUS } from "application/contstans/const.orgstatus";
import { useGetPointStatusMutation } from "servises/repository/RTK/RTKLocation";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { ROUTE_APP } from "application/contstans/route.const";
import useBarPayment from "application/hooks/useBarPayment";
import CartNotificateDyalPay from "application/components/core/Cart/CartModals/CartNotificateDyalPay";

type ICartLayout = {
    children:ReactNode
}

const CartLayout: FC<ICartLayout> = ({ children }) => {
	const point = adapterSelector.useSelectors((selector) => selector.point);
	const pointstatus = adapterSelector.useSelectors(selector => selector.pointstatus)
  const { orderType } = adapterSelector.useSelectors(selector => selector.cart);
	const {paymentMetod} = adapterSelector.useSelectors(selector => selector.bankcard)
	const [getOrgstatus,{data:orgstatus}] = useGetPointStatusMutation()
	const history = useHistory();

	if(!pointstatus){
		history.push(ROUTE_APP.MAIN)
	}


	useEffect(()=>{
		getOrgstatus(point.guid)
	},[point.guid])

  return (
      <div className="cat_app" style={{ backgroundColor: "#fff" }}>


					
          <div className="cart">
              <CartHeader />
              <div className="container">
                  <CartChoise />
              </div>
              <CartList />
              <div>
                  {orderType === CART_CHOICE.COURIER && <CartDeliveryPrice />}
                  <CartTotal />
                  <Discounts />
                  <DeliveryCost/>
                  {workTimeHelp(point.workTime) && pointstatus.organizationStatus === ORG_STATUS.WORK
                      ? <div className="point-closed">
                          <div className="point-closed-cart-container">
                              <div className="top-text">Хинкальная сейчас закрыта.<br />
                                  Оформить заказ можно: <span>{workTimeCheck(point.workTime) }</span></div>
                              <div className="text-secondary">
                                  А пока вы можете ознакомится <br />
                                  с нашим меню и почитать новости
                              </div>
                          </div>
                          <div className="text-secondary-closed">После заказа с вами свяжется администратор</div>
                          <div className="form__create">
                              <div className="clear">
                                  <img
                                      src={require("assets/i/clear_cart.svg").default}
                                      alt="Очистить корзину"
                                  />
                              </div>
                              <button
                                  type="submit"
                                  className="cart__order-btn"
                                  disabled={true}
                              >
                                  Заказать
                              </button>
                          </div>
                      </div>
                      : pointstatus.organizationStatus === ORG_STATUS.NODELIVERY ?
                          <>
													<div className="point-closed">
                              <div className="point-closed-cart-container">
                                  <div className="top-text">Хинкальная только открылась <br /> и готовится  к подключению онлайн-заказов</div>
                                  <div className="text-secondary">
																		Сейчас вы можете ознакомиться с нашим меню,<br /> просмотреть новости и узнать об актуальных акциях 
                                  </div>
                              </div>
                              <button
                                  type="submit"
                                  className="order-btn-pointclosed"
                                  disabled={true}
                              >
                                  Заказать
                              </button>
														</div>	
                          </>
												
                          : children
                  }
              </div>
          </div>
      </div>
  );
};
export default CartLayout;
