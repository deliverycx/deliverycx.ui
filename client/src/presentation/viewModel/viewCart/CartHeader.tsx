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

  const declinationDishes = (num: number) => {
    const n = num % 10;
    if(num === 1 || (n === 1 && num !== 11)) return 'блюдо'
    if(num > 1 && num < 5 || (n > 1 && n < 5) && (num > 14)) return 'блюда'
    else return 'блюд'
  }
  return (
    <HeaderBack onClickCb={historyHandler}>
        Ваш заказ <span className="select-red">{itemsCount}</span> {declinationDishes(itemsCount)}
    </HeaderBack>
  )
}
export default CartHeader
