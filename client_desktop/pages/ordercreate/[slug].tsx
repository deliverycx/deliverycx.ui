import { adapterComponentUseCase } from "adapters/adapterComponents";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import Ordering from "application/components/core/Order/Ordering";
import { useOrderCreate } from "domain/use-case/useCaseOrder/useCase.OrderCreate";
import { NextPage } from "next";
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
import { accessOrder, fetchDeleteCart } from "servises/redux/slice/cartSlice";

const Success: NextPage = () => {
	const useCase = adapterComponentUseCase(useOrderCreate)
	const {orderNumber,createOrder} = useCase.data
	const {handleBacktoCart,handleBacktoShop} = useCase.handlers
	const {orderLoad} = useCase.status
	


  return (
    <div className="container">
		  <div className="header">
  			<div className="header__left">
  				<img className="header_logo" src="../images/logo-top.svg" alt="" />
  			</div>
  			<div className="header__center">
          
  			</div>
  			<a onClick={handleBacktoShop} className="back_shop">
          Вернуться в меню
          </a>
      </div>
      <div className="cart_page-container cart_page-container--center">
        
			<div className="ordering">
				
        {
          (!orderNumber && orderLoad) &&
          <div className="cart_head">
          <div className="cart_title-box">
              <h2 className="cart_title">Ваш заказ обрабатывается</h2>
           </div>   
            <div className="cart_list orderload">
              <LoaderProduct />
            </div>
            
          </div>
        }
        {
          orderNumber &&
          <div className="ordering_head">
						<img src="/images/i/okorder.png" />
            <div className="cart_title-box">
              <h2 className="cart_title">Спасибо за заказ!</h2>
            </div>
						
            <div className="checkout__dash-succ"> <span>Ваш заказ</span>  оформлен. </div><br />
						<div>С вами свяжется администратор.</div>
            
          </div>
          
        }
        {
        (!orderNumber && !orderLoad) &&
          <div className="cart_head">
            <div className="cart_title-box">
              <h2 className="cart_title">Ошибка при заказе</h2>
            </div>  
              <div className="cart_list">
                <div className="checkout__dash">С вами свяжется администратор</div>
								<br />
              </div>
           </div>   
            
        }
        
     </div>
      </div>
    </div>
  );
}
export default Success



