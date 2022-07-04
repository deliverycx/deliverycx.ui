import { IReqCart } from "@types"
import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import { useCartItems } from "domain/use-case/useCaseCart"
import React, { FC } from "react";
import CartItem from "./CartItem";
import SpecialOfferGift from "../../../../common/SpecialOffer/SpecialOfferGift";

type IProps = {
  empty:any
}

export const CartContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const CartList:FC<IProps> = ({empty}) => {
  const useCaseCart = adapterComponentUseCase(useCartItems,empty)
  const {cartList, orderError} = useCaseCart.data;
  const {debounceClearHandler} = useCaseCart.handlers

  return (
    <div className="cart_head">
      <div className="cart_title-box">
        <h2 className="cart_title">Корзина</h2>
        <div className="clear_cart" onClick={debounceClearHandler}>
          <span className="cart-svg" />
          <span className="clear">Очистить</span>
        </div>
      </div>
      <div className="cart_list cart-price-info">
        {
          cartList.map((el: IReqCart) => {
            return (
              <CartContext.Provider key={el.id} value={useCaseCart}>
                <CartItem product={el} errorSchema={orderError} />
              </CartContext.Provider>
            );
          })
        }
      </div>
    </div>
  )
}

export default CartList
