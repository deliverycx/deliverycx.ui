import { adapterComponentUseCase } from "adapters/adapterComponents"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import { useOrder, useOrderDualPayment } from "domain/use-case/useCaseOrder"

const DyalPayment = () =>{
	const useCaseOrder = adapterComponentUseCase(useOrder)
	const {orderNumber,hash} = useCaseOrder.data
  const {orderLoad} = useCaseOrder.status

	const useCaseDyalPay = adapterComponentUseCase(useOrderDualPayment,{orderNumber,hash})
	const {orderInfo} = useCaseDyalPay.data
	const {handlerBackToOrder,handlerPayBar} = useCaseDyalPay.handlers

	
	return(
		<div className="cart order-container">
      
      
        {
          (!orderNumber && orderLoad) &&
          <div className="checkout">
            <div className="checkout__title">Ваш заказ обрабатывается</div>
            <LoaderProduct />
          </div>
        }

				{
					(orderNumber && orderInfo) &&
					<div className="dyalpay_page">
							<div className="dyalpay_page-text">Первая оплата успешно прошла!</div>
							<div className="dyalpay_page-deck">Можете продолжить расчет по бару онлайн или оплатить при получении заказа наличными</div>
							<div className="dyalpay_page-deck">Оставшаяся сумма:  <span className="price">{orderInfo.dyalPayment.BarPaymentAmount}</span>  </div>
							<button type="submit"  className="dyalpay_page-btn" onClick={handlerPayBar}>Онлайн</button>
							<button type="submit"  className="dyalpay_page-back" onClick={handlerBackToOrder}>Наличными</button>
					</div>
				}
				
        
        {
            (!orderNumber && !orderLoad) &&
            <div className="checkout">
              <div className="checkout__title">Ошибка при заказе</div>
              <p className="checkout__dash">С вами свяжется администратор</p>
            </div>
        }
        
     </div>
	)
}
export default DyalPayment