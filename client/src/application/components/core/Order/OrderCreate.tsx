import HeaderBack from "presentation/viewModel/viewHead/HeaderBack"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderCreate } from "domain/use-case/useCaseOrder/useCase.OrderCreate";

const OrderCreate = () =>{
	const useCase = adapterComponentUseCase(useOrderCreate)
	const {createOrder} = useCase.data
	const {handleBacktoCart} = useCase.handlers

	

	return(
		<div className="cart order-container">
      <HeaderBack onClickCb={handleBacktoCart}>
          Вернуться в магазин
      </HeaderBack>
		</div>
	)
}
export default OrderCreate