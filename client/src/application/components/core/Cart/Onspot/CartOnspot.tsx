import { CART_CHOICE } from "application/contstans/cart.const";
import { ROUTE_APP } from "application/contstans/route.const";
import { adapterSelector } from "servises/redux/selectors/selectors";
import CartFrom from "../CartForm/CartForm";
import { FormBuilderCart } from "../CartForm/CartFormBuilder";
import { CartFormMetods } from "../CartForm/CartMetods";
import OnspotSelect from "./OnspotSelect";

const CartOnspot = () => {
  const { deltaPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart)
  const { city, address } = adapterSelector.useSelectors(selector => selector.point)
  return (
    <>
      <div className="cart__memo">
        <OnspotSelect />
      </div>
      <CartFrom builder={FormBuilderCart.onspot(CartFormMetods)} paths={ROUTE_APP.CART.CART_ONSPOT} />
    </>
  );
}
export default CartOnspot