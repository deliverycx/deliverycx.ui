import { CART_CHOICE } from "application/contstans/cart.const"
import { adapterSelector } from "servises/redux/selectors/selectors"

const CartPriceInfo = () => {
  const { deltaPrice, orderType } = adapterSelector.useSelectors(selector => selector.cart)
  const { city, address } = adapterSelector.useSelectors(selector => selector.point)
  const {deliveryPrice} = adapterSelector.useSelectors(selector => selector.cart)
  return (
      <div className="cart__memo cart-price-info">
        <div className="cart__memo__banner ">Доставка <b className="price">{deliveryPrice} ₽</b></div>
        {
          orderType === CART_CHOICE.COURIER && (
            deltaPrice === 0
              ? <div className="cart__memo__banner free-deliv">Доставка <span className="cart-price-free">бесплатно</span></div>
              : <div className="cart__memo__banner ">До бесплатной доставки закажите на сумму <b className="price">{deltaPrice} ₽</b></div>
          )
        }
        {
          orderType === CART_CHOICE.PICKUP &&
          <div className="cart__memo__banner">Заказ можно получить по адресу,<br /> <b className="price"> г. {city}, {address} </b></div>
        }
        Условия доставки в отдалённые районы могут отличаться
      </div>
  )
}
export default CartPriceInfo
