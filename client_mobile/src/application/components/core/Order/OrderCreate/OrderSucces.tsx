import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import TabBar from "application/components/common/TabBar/TabBar";
import { ROUTE_APP } from "application/contstans/route.const";
import { appUseCase } from "modules/AppModule/app.module";
import { orderCreateRepository } from "modules/OrderModule/data/orderCreate.repository";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import ym from "react-yandex-metrika";
import { ref } from "yup";

const OrderSucces = () =>{
	const {hash} = useParams()
	const ref = useRef<NodeJS.Timeout>();
	const navigate = useNavigate()
	const [orderNumber,setOrderNumber] = useState<null | number>(null)
	const [orderLoad, setOrderLoad] = useState(true);


	

	useEffect(() => {
		if ((location.pathname.split("/")[1] === "success") && hash) {
			presentOrder(hash);
		} else {
			navigate(ROUTE_APP.ORDER.ORDER_MAIN)
		}  
		() => {

			clearInterval(ref.current as any);
		};   
	}, [hash]);

	useEffect(()=>{
		if(orderNumber){
			appUseCase.crearOrder()
			//ym('reachGoal','ordercreate')
		}
	},[orderNumber])


	const presentOrder = async (hashNumb: string, tik = 0) => {
		try {
				let tik = 0;
					ref.current = setInterval(async () => {
							const result = await orderCreateRepository.repositoryGetOrder(hashNumb);
							new Promise((res, rej) => {

									if (result && result.orderNumber) {
											clearInterval(ref.current as any);
											res(result.orderNumber);
									} else {
											++tik;
											rej();
									}
							})
									.then((number) => {
											setOrderNumber(number as number);
											setOrderLoad(false);
									})
									.catch(() => {
											setOrderNumber(null);
											if (tik > 15) {
													clearInterval(ref.current as any);
													setOrderLoad(false);
											} else {
													setOrderLoad(true);
											}
									});
					}, 5000);
			} catch (error) {
					setOrderNumber(null);
					clearInterval(ref.current as any);
			}
	};

	return (
		<div className="order-accepted">
			<div className="top-bar">
				{
					orderNumber ?
						<div className="top-bar__left">
							<div className="top-bar__icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.29 16.29L5.7 12.7C5.31 12.31 5.31 11.68 5.7 11.29C6.09 10.9 6.72 10.9 7.11 11.29L10 14.17L16.88 7.29C17.27 6.9 17.9 6.9 18.29 7.29C18.68 7.68 18.68 8.31 18.29 8.7L10.7 16.29C10.32 16.68 9.68 16.68 9.29 16.29Z" fill="#8D191D" /></svg>
							</div>
							<h3>Заказ принят</h3>
						</div>
						: <div className="top-bar__left">
							<div className="top-bar__icon">
							</div>
							<h3>Оформление заказа</h3>
						</div>
				}

			</div>
			{
				(!orderNumber && orderLoad) &&
				<div className="order-accepted__content">
					<div className="checkout">
						<div className="order-accepted__content-title">Ваш заказ обрабатывается</div>

						<LoaderProduct />
					</div>
				</div>
			}
			{
				orderNumber &&
				<>
					<div className="order-accepted__content">
						<div className="order-accepted__content-sticker">
							<img src={require("assets/images/delivery/unauthorized.png")} alt="Весёлый хинкалик" />
						</div>
						<div className="order-accepted__content-title">Спасибо за заказ!</div>
						<div className="order-accepted__content-number">
							Номер заказа
							<span>№ {orderNumber}</span>
						</div>
						<div className="order-accepted__content-text">
						В ближайшее время с вами свяжутся и уточнят детали
						</div>
					</div>
					<div className="order-accepted__buttons">
						<button className="btn btn-md btn-red" onClick={()=> navigate(ROUTE_APP.SHOP.SHOP_MAIN)}>Хорошо</button>
						<button className="btn btn-md btn-gray">Оставить отзыв</button>
					</div>
				</>
			}
			{
				(!orderNumber && !orderLoad) &&
				<div className="checkout">
					<div className="order-accepted__content">
						<div className="order-accepted__content-sticker">
							<img src={require("assets/images/delivery/no_addresses.png")} alt="Весёлый хинкалик" />
						</div>
						<div className="order-accepted__content-title">Ошибка при заказе</div>
						<div className="order-accepted__content-text">
						Пожалуйста, позвоните в хинкальную
						</div>
					</div>
					<div className="order-accepted__buttons">
						<button className="btn btn-md btn-red" onClick={() => navigate(ROUTE_APP.ORDER.ORDER_MAIN)}>Вернуться в назад</button>
						<NavLink to="https://t.me/StarikHinkalichBot"  className="btn btn-md btn-gray">Сообщить об ошибке</NavLink>
					</div>

				</div>
			}

			<TabBar />
		</div>
	)
}
export default OrderSucces