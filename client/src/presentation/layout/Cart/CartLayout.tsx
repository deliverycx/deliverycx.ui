/* eslint-disable no-mixed-spaces-and-tabs */
import CartChoise from "application/components/core/Cart/CartChoice";
import CartList from "application/components/core/Cart/CartBasket/CartList";
import CartTotal from "application/components/core/Cart/CartBasket/CartTotal";
import CartHeader from "presentation/viewModel/viewCart/CartHeader";
import { FC, ReactNode } from "react";
import CartDeliveryPrice from "application/components/core/Cart/CartBasket/CartDeliveryPrice";
import { workTimeHelp } from "application/helpers/workTime";
import Discounts from "application/components/core/Cart/CartBasket/HOC_Discount";
import { adapterSelector } from "servises/redux/selectors/selectors";

type ICartLayout = {
    children:ReactNode
}

const CartLayout: FC<ICartLayout> = ({ children }) => {
	const point = adapterSelector.useSelectors(
    (selector) => selector.point
  );
	const q = workTimeHelp() ? { minHeight: "86vh"} : { minHeight: "100vh" }
	console.log('cart',workTimeHelp());
  return (
    <div className="cat_app" style={{ backgroundColor: "#fff" }}>
      <div className="cart">
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
                    Оформить заказ вы сможете: <span>{point.workTime}</span></div>
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
