/* eslint-disable no-mixed-spaces-and-tabs */
import CartChoise from "application/components/core/Cart/CartChoice";
import CartList from "application/components/core/Cart/CartBasket/CartList";
import CartTotal from "application/components/core/Cart/CartBasket/CartTotal";
import CartHeader from "presentation/viewModel/viewCart/CartHeader";
import { FC, ReactNode } from "react";
import CartDeliveryPrice from "application/components/core/Cart/CartBasket/CartDeliveryPrice";
import { workTimeHelp } from "application/helpers/workTime";
import Discounts from "application/components/core/Cart/CartBasket/HOC_Discount";

type ICartLayout = {
    children:ReactNode
}

const CartLayout: FC<ICartLayout> = ({ children }) => {

	const q = workTimeHelp() ? { minHeight: "86vh"} : { minHeight: "100vh" }
  return (
    <div className="cat_app" style={{ backgroundColor: "#fff" }}>
      <div className="cart" style={q}>
        <CartHeader />
        <div className="container">
          <CartChoise />
          </div>
          <CartList />
          <div className="container">
            <CartDeliveryPrice />
          <CartTotal />
					<Discounts />
					{workTimeHelp() 
            ? <div className="point-closed-cart-container">
                <div className="top-text">Хинкальная сейчас закрыта.<br/>
                    Оформить заказ вы сможете: <span>9:00-21:30</span></div>
                <div className="text-secondary">
                    Приносим извинения за неудобства. <br/>
                    Сейчас вы можете ознакомиться с меню для будущих заказов и узнать об акциях и новинках.
                </div>
            </div>
						: children
        	}
          
        </div>
      </div>
    </div>
  );
};
export default CartLayout;
