import CartList from "../../HOC_Basket/view/CartList"
import CartTotal from "../../HOC_Basket/view/CartTotal"
import { workTimeCheck, workTimeHelp } from "application/helpers/workTime";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { CART_CHOICE } from "application/contstans/cart.const";
import { ORG_STATUS } from 'application/contstans/const.orgstatus';

const CartSmallList = ({onClose}:any) => {
	const points = adapterSelector.useSelectors((selector) => selector.point);
	const pointstatus = adapterSelector.useSelectors((selector) => selector.pointstatus);

	const times = workTimeCheck(points.workTime,points.guid)
	console.log('wwwwwww',times);


  return (
    <div className="cart_modals">
		<div className="cart-container">
			<div className="close" onClick={onClose}>
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 1L12.9991 13M13 1L1.0009 13" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</div>
			<CartList empty={() => onClose()} />
			<CartTotal />
			{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}

			{
				
				workTimeHelp() && pointstatus.organizationStatus === ORG_STATUS.WORK
				? <button disabled className="order-btn-pointclosed">Хинкальная сейчас закрыта.<br/>
					
					</button>
				: pointstatus.organizationStatus === ORG_STATUS.NODELIVERY ?
					<button disabled className="order-btn-pointclosed">Оформление онлайн-заказа недоступно</button>
						// eslint-disable-next-line @next/next/no-html-link-for-pages
				: <a className="cart__order-btn btn cart-btn" href="/checkout">Оформить заказ </a>
				
			}
		</div>
	</div>
  )
}
export default CartSmallList
//Оформить заказ вы сможете: {workTimeCheck(points.workTime)}