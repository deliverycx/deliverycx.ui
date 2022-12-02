/* eslint-disable @typescript-eslint/no-var-requires */
import { useContext } from "react"
import { CartFormContext } from "../CartForm/CartForm"
import cn from "classnames";
import { useHistory } from 'react-router-dom';
import { CartFormMetods } from "../CartForm/CartMetods";
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { CART_CHOICE } from "application/contstans/cart.const";
import parse from 'html-react-parser'
// CartLayout - CartDelivery - cartForm - CartModals


const CartModalPayment = () => {
  const history = useHistory()
  const useCaseForm = useContext(CartFormContext)
  const { paymentMetod } = useCaseForm.data
  const { selectPayment } = useCaseForm.handlers
	const {orderType} = adapterSelector.useSelectors(selector => selector.cart)

  const paymentMetods = orderType === CART_CHOICE.ONSPOT ? CartFormMetods.paymentsMetodONSPOT : CartFormMetods.paymentsMetod

  const activeIcons = (active:string) => {
    return  cn("popupFixCart_box__list-item", { active_item: active === paymentMetod.id });
  }
  
  
  return (
    <div className="popupFixCart">
            <div className="popupFixCart_box">
              <div className="popupFixCart_box__plash"></div>
              <div className="popupFixCart_box__title" onClick={()=> history.goBack()}>
                <img src={require("assets/i/arrow_back.svg").default} alt="" />
                <span>Способ оплаты</span>
              </div>
              <ul className="popupFixCart_box__list">
								{
									paymentMetods.map((val:any)=>{
										return (
											<li key={val.id} className={activeIcons(val.id)} onClick={()=> selectPayment(val)}>
                  <div className="popupFixCart_box_item__icon">
                  {
										parse(val.icon)
										
									}

                  </div>
                  <div className="popupFixCart_box_item__text">{val.value}</div>
                </li>
										)
									})
								}
								
              </ul>
            </div>
          </div>
  )
}
export default CartModalPayment