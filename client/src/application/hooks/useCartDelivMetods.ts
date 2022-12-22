import { DELIVERY_METODS } from "application/contstans/const.orgstatus";
import { ROUTE_APP } from "application/contstans/route.const";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { fetchAllCart, setOrderType } from "servises/redux/slice/cartSlice";

const useCartDelivMetods = () =>{
	const dispatch = useDispatch();
	const history = useHistory();
	const pointstatus = adapterSelector.useSelectors(selector => selector.pointstatus)

	const handlerChangeDelivMetod = (urls:string,metod:string) =>{
		dispatch(setOrderType(metod));
		dispatch(fetchAllCart());
		history.push(ROUTE_APP.CART.CART_DELIVERY);
	}

	return {handlerChangeDelivMetod}
}
export default useCartDelivMetods