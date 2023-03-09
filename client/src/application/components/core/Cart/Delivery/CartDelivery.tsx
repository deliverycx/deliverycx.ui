import CartFrom from "application/components/core/Cart/CartForm/CartForm";
import { FormBuilderCart } from "../CartForm/CartFormBuilder";
import { CartFormMetods } from "../CartForm/CartMetods";
import CartModals from "../CartModals/CartModals";
import { ROUTE_APP } from './../../../../contstans/route.const';
import { adapterSelector } from './../../../../../servises/redux/selectors/selectors';
import { CART_CHOICE } from "application/contstans/cart.const";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";


const CartDelivery = () => {
  const history = useHistory();

  return (
    <>
      <CartFrom builder={FormBuilderCart.delivery(CartFormMetods)} paths={ROUTE_APP.CART.CART_DELIVERY} />
    </>
  );
};
export default CartDelivery;
