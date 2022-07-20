import { adapterSelector } from 'servises/redux/selectors/selectors';
import { CART_CHOICE } from "../../../../contstans/cart.const";

const CartTotal = () => {
  const {totalPrice} = adapterSelector.useSelectors(selector => selector.cart)
    const { deltaPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart)
  return (
    <div>
            {
                /*
                <div className="cart__order__sale-wrap">
                    <div className="cart__order-info__title">Скидка</div>

                    <input onChange={(e)=>dispatch(changePromoCode(e.target.value))} value={cartState.promocode} className="cart__order-info__sale-input" placeholder="ВАШ ПРОМОКОД" type="text" />

                    <div className="cart__order__sale">0 ₽</div>
                </div>

                */
            }
            <div className="cart__memo">
                {
                    orderType === CART_CHOICE.COURIER && (
                        deltaPrice === 0
                            ? <div className="cart__memo__banner free-deliv"><span className="ok-icon"></span>Бесплатная доставка от 700 ₽</div>
                            : <div className="cart__memo__banner ">До бесплатной доставки закажите на сумму {deltaPrice} ₽</div>
                    )
                }
            </div>
            <div className="cart__order__total-wrap">
                <div className="cart__order__total-title">Итого</div>
                <div className="cart__order__total-sum">{totalPrice} ₽</div>
            </div>
        </div>
  )
}
export default CartTotal
