import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import TabBar from 'application/components/common/TabBar/TabBar';

const HOCOrder = () => {
	const navigate = useNavigate()

	return (
		<div className="order-placement unauthorized">
			<div className="top-bar">
				<div className="top-bar__left">
					<div className="top-bar__icon" onClick={() => navigate(ROUTE_APP.CART.BASKET_MAIN)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19.0005 11.0002H7.83047L12.7105 6.12021C13.1005 5.73021 13.1005 5.09021 12.7105 4.70021C12.3205 4.31021 11.6905 4.31021 11.3005 4.70021L4.71047 11.2902C4.32047 11.6802 4.32047 12.3102 4.71047 12.7002L11.3005 19.2902C11.6905 19.6802 12.3205 19.6802 12.7105 19.2902C13.1005 18.9002 13.1005 18.2702 12.7105 17.8802L7.83047 13.0002H19.0005C19.5505 13.0002 20.0005 12.5502 20.0005 12.0002C20.0005 11.4502 19.5505 11.0002 19.0005 11.0002Z" fill="#8D191D" /></svg>
					</div>
					<h3>Оформление заказа</h3>
				</div>
			</div>
			<div className="order-placement__tabs">

			</div>
			<TabBar />
		</div>
	)
}
export default HOCOrder