/* eslint-disable @typescript-eslint/no-var-requires */
import { ROUTE_APP } from "application/contstans/route.const";

import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

const CartNotificateDyalPay = () =>{
	const history = useHistory()
	
	useEffect(() => {
		const root:any = document.getElementById('root')
		if(root){
			root.className = "no-scroll"
		}else{
			root.className = ""
		}

   
    return () => {
      root.className = ""
    }
  }, []);

	return(
		<>
		<div className="dualpay__popup">
							<img src={require("assets/img/dualpay.svg").default} />
							<div className="dualpay__popup-text">Генацвале, у нас раздельный учет чеков по кухне и бару</div>
							<div className="dualpay__popup-deck">Предупреждаем, что будет 2 оплаты: <br /> за блюда и за напитки</div>
							<button type="submit" onClick={()=> history.goBack()}  className="dualpay__popup-back">К Оплате</button>
							<button type="submit" onClick={()=> history.push(ROUTE_APP.CART.CART_DELIVERY)}  className="dualpay__popup-btn">Принято</button>
						</div>
		</>
	)
}

export default CartNotificateDyalPay