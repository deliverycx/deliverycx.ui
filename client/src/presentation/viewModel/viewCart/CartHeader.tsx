import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useAddCart } from "domain/use-case/useCaseCart"
import { useHistory } from "react-router-dom";
import HeaderBack from "../viewHead/HeaderBack"
import { ROUTE_APP } from 'application/contstans/route.const';
import { accessOrder, setENErrors, setErrors } from "servises/redux/slice/cartSlice";
import { useDispatch } from 'react-redux';

const CartHeader = () => {
  const history = useHistory();
	const dispatch = useDispatch()
  const useCaseCart = adapterComponentUseCase(useAddCart)
  const { itemsCount } = useCaseCart.data;

  const historyHandler = ()=>{
    history.push(ROUTE_APP.SHOP.SHOP_MAIN);
    dispatch(setENErrors({}))
  }
  return (
    <HeaderBack onClickCb={historyHandler}>
        Ваш заказ <span className="select-red">{itemsCount}</span> блюд
    </HeaderBack>
  )
}
export default CartHeader