/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-var-requires */
import CartChoise from "application/components/core/Cart/CartChoice";
import CartList from "application/components/core/Cart/CartBasket/CartList";
import CartTotal from "application/components/core/Cart/CartBasket/CartTotal";
import CartHeader from "presentation/viewModel/viewCart/CartHeader";
import React, { FC, ReactNode } from "react";
import CartDeliveryPrice from "application/components/core/Cart/CartBasket/CartDeliveryPrice";
import { workTimeHelp } from "application/helpers/workTime";
import Discounts from "application/components/core/Cart/CartBasket/HOC_Discount";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { CART_CHOICE } from "application/contstans/cart.const";
import DeliveryCost from "../../../application/components/core/Cart/CartBasket/DeliveryCost";

type ICartLayout = {
    children:ReactNode
}

const CartLayout: FC<ICartLayout> = ({ children }) => {
	const point = adapterSelector.useSelectors(
    (selector) => selector.point
  );


  return (
      <div className="cat_app" style={{ backgroundColor: "#fff" }}>
          <div className="cart">
              <CartHeader />
              <div className="container">
                  <CartChoise />
              </div>
              <CartList />
              <div>
                  <CartDeliveryPrice />
                  <CartTotal />
                  <Discounts />
                  <DeliveryCost/>
                  {workTimeHelp()
                      ? <div className="point-closed">
                          <div className="point-closed-cart-container">
                              <div className="top-text">Хинкальная сейчас закрыта.<br />
                                  Оформить заказ можно: <span>{point.workTime}</span></div>
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
                      : point.delivMetod === CART_CHOICE.NODELIVERY ?
                          <>
                              <div className="point-closed-cart-container">
                                  <div className="top-text">Онлайн заказ недоступен</div>
                                  <div className="text-secondary">
                                      Приносим извинения за неудобства. <br />
                                  </div>
                              </div>
                              <button
                                  type="submit"
                                  className="order-btn-pointclosed"
                                  disabled={true}
                              >
                                  Заказать
                              </button>
                          </>
                          : children
                  }
              </div>
          </div>
      </div>
  );
};
export default CartLayout;
