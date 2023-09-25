/* eslint-disable @typescript-eslint/no-var-requires */
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderCreate } from "domain/use-case/useCaseOrder/useCase.OrderCreate";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";

const OrderCreate = () =>{
	const useCase = adapterComponentUseCase(useOrderCreate)
	const {orderNumber,createOrder} = useCase.data
	const {handleBacktoCart,handleBacktoShop} = useCase.handlers
	const {orderLoad} = useCase.status
	

	return(
		<div className="cart order-container">
      <HeaderBack onClickCb={handleBacktoShop}>
          Вернуться в магазин
      </HeaderBack>

			{
          (!orderNumber && orderLoad) &&
          <div className="checkout">
            <div className="checkout__title">Ваш заказ обрабатывается</div>
            <LoaderProduct />
          </div>
        }
        {
          orderNumber &&
          <div className="checkout">
            <img src={require("assets/img/ok.png").default} />
            <div className="checkout__title">Спасибо за заказ!</div>
            <div className="checkout__order">№ {orderNumber}</div>
            <p className="checkout__dash">
            Ваш заказ оформлен. <br />
            </p>
          </div>
          
        }
        {
            (!orderNumber && !orderLoad) &&
            <div className="checkout">
              <div className="checkout__title">Ошибка при заказе</div>
              <p className="checkout__dash">Мы работаем над решением ошибки</p>
							<button type="submit"  className="checkout__backcart" onClick={handleBacktoCart}>Вернуться в меню</button>
            </div>
        }
		</div>
	)
}
export default OrderCreate