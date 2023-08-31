/* eslint-disable @typescript-eslint/no-var-requires */
import { FC } from "react"
import { useHistory } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';
import { CART_CHOICE } from "application/contstans/cart.const";

import { useDispatch } from "react-redux";
import { setOrderType } from "servises/redux/slice/cartSlice";


const CartOnspotPopup:FC<{set:any}> = ({set}) =>{
	const history = useHistory()
	const dispatch = useDispatch();
	return(
		<div className="dualpay__popup">
							<img src={require("assets/img/dualpay.svg").default} />
							<div className="dualpay__popup-red">Внимание!</div>
							<div className="dualpay__popup-text">Не является бронью стола <br /> или места в очереди!</div>
							<div className="dualpay__popup-deck">Предзаказ помогает ускорить Ваше обслуживание.</div>
							<button type="submit" onClick={()=> set(false)}  className="dualpay__popup-btn">Продолжить</button>
						</div>
		
	)
}
export default CartOnspotPopup