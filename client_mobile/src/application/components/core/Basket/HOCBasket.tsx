import { basketUseCase } from "modules/BasketModule/basket.module";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import HOCCart from "./Cart/HOCCart";
import CartDiscount from "./view/CartDiscount";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { observer } from "mobx-react-lite";
import BasketPrice from "./view/BasketPrice";
import HOCAdditionProducts from "../Shop/Products/AdditionProducts/HOC.AdditionProducts";
import TabBar from "application/components/common/TabBar/TabBar";
import BasketOrder from "./view/BasketOrder";
import ModalCard from "application/components/common/Modals/ModalCard";
import BasketDevices from "./view/BasketDevices";

const HOCBasket = () => {
	const { cart, basketPrice } = basketUseCase.basketModel
	const [isModalDeleteOpened, setIsModalDeleteOpened] = useState(false)
	
	const navigate = useNavigate()
	

	useEffect(() => {
		basketUseCase.cartCase().then(data => {
			if (!data && !Array.isArray(data)) {
				navigate(ROUTE_APP.SHOP.SHOP_MAIN)
			}
		})
	}, [])

	return (
		<>
			<div className="basket">
				<div className="top-bar">
					<div className="top-bar__left">
						<div className="top-bar__icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4.99984 21C4.71651 21 4.45818 20.9125 4.22484 20.7375C3.99151 20.5625 3.83318 20.3333 3.74984 20.05L0.949842 9.95C0.866508 9.71667 0.904008 9.5 1.06234 9.3C1.22068 9.1 1.43318 9 1.69984 9H6.74984L11.1498 2.45C11.2332 2.31667 11.3498 2.20833 11.4998 2.125C11.6498 2.04167 11.8082 2 11.9748 2C12.1415 2 12.2998 2.04167 12.4498 2.125C12.5998 2.20833 12.7165 2.31667 12.7998 2.45L17.1998 9H22.2998C22.5665 9 22.779 9.1 22.9373 9.3C23.0957 9.5 23.1332 9.71667 23.0498 9.95L20.2498 20.05C20.1665 20.3333 20.0082 20.5625 19.7748 20.7375C19.5415 20.9125 19.2832 21 18.9998 21H4.99984ZM11.9998 17C12.5498 17 13.0207 16.8042 13.4123 16.4125C13.804 16.0208 13.9998 15.55 13.9998 15C13.9998 14.45 13.804 13.9792 13.4123 13.5875C13.0207 13.1958 12.5498 13 11.9998 13C11.4498 13 10.979 13.1958 10.5873 13.5875C10.1957 13.9792 9.99984 14.45 9.99984 15C9.99984 15.55 10.1957 16.0208 10.5873 16.4125C10.979 16.8042 11.4498 17 11.9998 17ZM9.17484 9H14.7998L11.9748 4.8L9.17484 9Z" fill="#8D191D" /></svg>
						</div>
						<h3>Корзина</h3>
					</div>
					<button onClick={() => setIsModalDeleteOpened(true)} className="btn btn-none top-bar__icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#8D191D" />
						</svg>
					</button>
				</div>
				{
					cart && basketPrice ?
						<div className="basket__content">

							<HOCCart cart={cart} />
							<BasketDevices />
							<CartDiscount cartList={cart} basketPrice={basketPrice} />
							<BasketPrice basketPrice={basketPrice} />

						</div>
						: <LoaderProduct />
				}
				<HOCAdditionProducts />
			</div>
			{
				basketPrice &&
				<BasketOrder basketPrice={basketPrice}/>
			}
			{isModalDeleteOpened &&
                <ModalCard setIsOpened={setIsModalDeleteOpened}>
                    <div className="modal">
                        <div className="modal__wrapper">
                            <div className="modal__header modal__header__fix justify-between">
                                <div className="d-flex flex-center justify-between">
                                    <div onClick={() => setIsModalDeleteOpened(false)} className="d-flex flex-center justify-center modal__btn no-drag">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 11.0002H7.82998L12.71 6.12021C13.1 5.73021 13.1 5.09021 12.71 4.70021C12.32 4.31021 11.69 4.31021 11.3 4.70021L4.70998 11.2902C4.31998 11.6802 4.31998 12.3102 4.70998 12.7002L11.3 19.2902C11.69 19.6802 12.32 19.6802 12.71 19.2902C13.1 18.9002 13.1 18.2702 12.71 17.8802L7.82998 13.0002H19C19.55 13.0002 20 12.5502 20 12.0002C20 11.4502 19.55 11.0002 19 11.0002Z" fill="#8D191D"/>
                                        </svg>
                                    </div>
                                    <h3>Очистить корзину?</h3>
                                </div>
                            </div>
                            <div className="modal__content gap-8">
                                <p>
									Вы точно хотите очистить корзину? Отменить данное действие будет невозможно.
                                </p>
                                <button onClick={() =>basketUseCase.deliteCart()} className="btn btn-sm btn-red no-drag">
                                    Очистить корзину
                                </button>
                                <button onClick={() => setIsModalDeleteOpened(false)} className="btn btn-sm btn-gray no-drag">
                                    Отменить
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalCard>
            }
			<TabBar />
		</>
	)
}
export default observer(HOCBasket)