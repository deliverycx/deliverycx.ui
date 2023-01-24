import { IReqCart } from "@types";
import { useSelector } from "react-redux";
import { cartSelector } from "servises/redux/slice/cartSlice";
import { useState, useEffect } from 'react';
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { PAYMENT_METODS } from "application/contstans/const.orgstatus";


const useBarPayment = () :any =>{
	const cartList = useSelector(cartSelector.selectAll);
	const paymetod = adapterSelector.useSelectors(selector => selector.bankcard)
	const [popup,setPopup] = useState(false)
	//console.log('cart',cartList);

	

	const arr = cartList.filter((item:IReqCart) =>{
		return item.productTags.includes("bar")
	})

	useEffect(()=>{
		if(arr.length !== 0 && paymetod.paymentMetod.id === PAYMENT_METODS.CARD){
				setPopup(true)
			}else{
				setPopup(false)
			}
	},[paymetod.paymentMetod])

	return [popup,setPopup]
}
export default useBarPayment