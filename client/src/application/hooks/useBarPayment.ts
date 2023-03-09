import { IReqCart } from "@types";
import { useSelector } from "react-redux";
import { cartSelector } from "servises/redux/slice/cartSlice";
import { useState, useEffect } from 'react';
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { PAYMENT_METODS } from "application/contstans/const.orgstatus";


const useBarPayment = (paymentMetod:string) :any =>{
	const cartList = useSelector(cartSelector.selectAll);

	

	const arr = cartList.filter((item:IReqCart) =>{
		return item.productTags.includes("bar")
	})

	

	
}
export default useBarPayment