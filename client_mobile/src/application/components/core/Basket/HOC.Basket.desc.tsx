import LayoutDesctop from 'application/components/common/Layout/LayoutDesctop';
import { basketUseCase } from 'modules/BasketModule/basket.module';
import HOCCart from './Cart/HOCCart';
import LoaderProduct from 'application/components/common/Loaders/loaderProduct';
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { useState, useEffect } from 'react';
import ModalCard from 'application/components/common/Modals/ModalCard';
import BasketDevices from './view/BasketDevices';
import BasketPrice from './view/BasketPrice';
import CartDiscount from './view/CartDiscount';
import BasketOrder from './view/BasketOrder';
import HOCAdditionProducts from '../Shop/Products/AdditionProducts/HOC.AdditionProducts';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  adapterComponentUseCase,
  TadapterCaseCallback,
} from 'adapters/adapterComponents';
import { useCartViewModel } from './Cart/Cart.viewModel';

export const BasketContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status: {},
});
const HOCBasketDesc = () => {
  const useCase = adapterComponentUseCase(useCartViewModel);
  const { cart, basketPrice, select } = useCase.data;
  const { selectAllCart, removeSelectItems } = useCase.handlers;
  const [isModalDeleteOpened, setIsModalDeleteOpened] = useState(false);

  return (
    <BasketContext.Provider value={useCase}>
      <div className="basket-desc">
        <div className="basket-desc_header">
          <h1>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.99935 21C4.71602 21 4.45769 20.9125 4.22435 20.7375C3.99102 20.5625 3.83269 20.3333 3.74935 20.05L0.949353 9.95C0.86602 9.71667 0.90352 9.5 1.06185 9.3C1.22019 9.1 1.43269 9 1.69935 9H6.74935L11.1494 2.45C11.2327 2.31667 11.3494 2.20833 11.4994 2.125C11.6494 2.04167 11.8077 2 11.9744 2C12.141 2 12.2994 2.04167 12.4494 2.125C12.5994 2.20833 12.716 2.31667 12.7994 2.45L17.1994 9H22.2994C22.566 9 22.7785 9.1 22.9369 9.3C23.0952 9.5 23.1327 9.71667 23.0494 9.95L20.2494 20.05C20.166 20.3333 20.0077 20.5625 19.7744 20.7375C19.541 20.9125 19.2827 21 18.9994 21H4.99935ZM11.9994 17C12.5494 17 13.0202 16.8042 13.4119 16.4125C13.8035 16.0208 13.9994 15.55 13.9994 15C13.9994 14.45 13.8035 13.9792 13.4119 13.5875C13.0202 13.1958 12.5494 13 11.9994 13C11.4494 13 10.9785 13.1958 10.5869 13.5875C10.1952 13.9792 9.99935 14.45 9.99935 15C9.99935 15.55 10.1952 16.0208 10.5869 16.4125C10.9785 16.8042 11.4494 17 11.9994 17ZM9.17435 9H14.7994L11.9744 4.8L9.17435 9Z"
                fill="#8D191D"
              />
            </svg>
            Корзина
          </h1>
          <div
            className="delite_basket"
            onClick={() => setIsModalDeleteOpened(true)}
          >
            <button className="btn btn-none top-bar__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                  fill="#8D191D"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="basket-desc_main">
          {cart && cart.length !== 0 && basketPrice && (
            <div className="basket__content__buttons">
              <label className="input__checkbox">
                <div className="checkbox">
                  <input type="checkbox" onChange={selectAllCart} />
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.71047 10.2901C5.32047 10.6801 4.69047 10.6801 4.30047 10.2901L0.710469 6.70006C0.320469 6.31006 0.320469 5.68006 0.710469 5.29006C1.10047 4.90006 1.73047 4.90006 2.12047 5.29006L5.00047 8.17006L11.8805 1.29006C12.2705 0.900059 12.9005 0.900059 13.2905 1.29006C13.6805 1.68006 13.6805 2.31006 13.2905 2.70006L5.71047 10.2901Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
                <p className="input__checkbox-label">Выбрать всё</p>
              </label>
              {select.length !== 0 && (
                <button
                  className="btn btn-none btn-icon-modal"
                  onClick={removeSelectItems}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2997 5.70997C17.9097 5.31997 17.2797 5.31997 16.8897 5.70997L11.9997 10.59L7.10973 5.69997C6.71973 5.30997 6.08973 5.30997 5.69973 5.69997C5.30973 6.08997 5.30973 6.71997 5.69973 7.10997L10.5897 12L5.69973 16.89C5.30973 17.28 5.30973 17.91 5.69973 18.3C6.08973 18.69 6.71973 18.69 7.10973 18.3L11.9997 13.41L16.8897 18.3C17.2797 18.69 17.9097 18.69 18.2997 18.3C18.6897 17.91 18.6897 17.28 18.2997 16.89L13.4097 12L18.2997 7.10997C18.6797 6.72997 18.6797 6.08997 18.2997 5.70997Z"
                      fill="#8D191D"
                    />
                  </svg>
                  Удалить выбранные
                </button>
              )}
            </div>
          )}
          <div className="link-to-cart">
            {cart && cart.length !== 0 && basketPrice ? (
              <>
                <div className="basket-desc_cart">
                  <HOCCart cart={cart} />
                </div>
                <div className="basket-desc_order">
                  <div className="basket-desc_order-box">
                    <BasketDevices />
                    <CartDiscount cartList={cart} />
                    <BasketPrice basketPrice={basketPrice} />
                    {basketPrice && (
                      <BasketOrder basketPrice={basketPrice} modal={true} />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="empty_basket">
                <img
                  src={require('assets/images/delivery/no_addresses.png')}
                  alt="Весёлый хинкалик"
                />
                <h4 className="empty_basket-title">Ваша корзина пуста</h4>
                <span className="empty_basket_content">
                  Чтобы совершить заказ, выберите себе что-нибудь вкусное!
                </span>
              </div>
            )}
          </div>
        </div>
        {isModalDeleteOpened && (
          <ModalCard setIsOpened={setIsModalDeleteOpened}>
            <div className="modal__wrapper">
              <div className="modal__header modal__header__fix justify-between">
                <div className="d-flex flex-center justify-between">
                  <div
                    onClick={() => setIsModalDeleteOpened(false)}
                    className="d-flex flex-center justify-center modal__btn no-drag"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 11.0002H7.82998L12.71 6.12021C13.1 5.73021 13.1 5.09021 12.71 4.70021C12.32 4.31021 11.69 4.31021 11.3 4.70021L4.70998 11.2902C4.31998 11.6802 4.31998 12.3102 4.70998 12.7002L11.3 19.2902C11.69 19.6802 12.32 19.6802 12.71 19.2902C13.1 18.9002 13.1 18.2702 12.71 17.8802L7.82998 13.0002H19C19.55 13.0002 20 12.5502 20 12.0002C20 11.4502 19.55 11.0002 19 11.0002Z"
                        fill="#8D191D"
                      />
                    </svg>
                  </div>
                  <h3>Очистить корзину?</h3>
                </div>
              </div>
              <div className="modal__content gap-8">
                <p>
                  Вы точно хотите очистить корзину? Отменить данное действие
                  будет невозможно.
                </p>
                <button
                  onClick={() => {
                    basketUseCase.deliteCart();
                    setIsModalDeleteOpened(false);
                  }}
                  className="btn btn-sm btn-red no-drag"
                >
                  Очистить корзину
                </button>
                <button
                  onClick={() => setIsModalDeleteOpened(false)}
                  className="btn btn-sm btn-gray no-drag"
                >
                  Отменить
                </button>
              </div>
            </div>
          </ModalCard>
        )}
      </div>
    </BasketContext.Provider>
  );
};

export default observer(HOCBasketDesc);
