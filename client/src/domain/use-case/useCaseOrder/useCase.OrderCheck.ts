import { IInitialValues } from "@types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setOrderInfo } from "servises/redux/slice/cartSlice";

export function useOrderCheck() {
	const history = useHistory()
  const dispatch = useDispatch()

	const handlerSubmitOrder = (value:IInitialValues) =>{
		console.log(value);
		dispatch(setOrderInfo(value))
	}

	this.data({
	
	});
	this.handlers({
		handlerSubmitOrder
	});
	this.status({
			
	});
}