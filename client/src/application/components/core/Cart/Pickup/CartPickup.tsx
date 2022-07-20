import CartFrom from "application/components/core/Cart/CartForm/CartForm";
import { FormBuilderCart } from "../CartForm/CartFormBuilder";
import { CartFormMetods } from "../CartForm/CartMetods";
import CartModals from "../CartModals/CartModals";
import { ROUTE_APP } from './../../../../contstans/route.const';
import { adapterSelector } from './../../../../../servises/redux/selectors/selectors';
import { CART_CHOICE } from "application/contstans/cart.const";

const CartPickup = () => {
  const { deltaPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart)
  const { city, address } = adapterSelector.useSelectors(selector => selector.point)
  return (
    <>
      <div className="cart__memo">
        {
          orderType === CART_CHOICE.PICKUP &&
          <div className="cart__memo__banner">
              <div>Заказ можно получить по адресу:</div>
              <div className="city-info"><span className="mark"/> г. {city}, {address} </div>
          </div>
        }
      </div>
      <CartFrom builder={FormBuilderCart.pickup(CartFormMetods)} paths={ROUTE_APP.CART.CART_DELIVERY} />
    </>
  );
}
export default CartPickup
