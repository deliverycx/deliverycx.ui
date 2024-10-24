/* eslint-disable no-irregular-whitespace */
import { FC, memo, useRef } from "react";
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useAddCart } from "domain/use-case/useCaseCart";
import { DILIVERY_TIME_STATUS } from "application/contstans/const.orgstatus";

const ShopLinkToCart: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const useCaseCart = adapterComponentUseCase(useAddCart,ref)
    const { itemsCount, emptyCN, time } = useCaseCart.data
    const {linkHandler} = useCaseCart.handlers

    return (
      <div className={emptyCN + ' overlay'}>
        <div onClick={linkHandler} className={emptyCN}>
          <div className="container row justify-between align-center">
            <div className="link-to-cart__count">
              {itemsCount}
            </div>

            <div className="link-to-cart__text">
              блюда ожидают оплаты
            </div>

            {/* <div className="link-to-cart__booking"></div> */}

            <div className="link-to-cart__empty" ref={ref}>
              <h1>
                Вы еще ничего<br/> <span className="select-red">не заказали</span>
              </h1>
              <p>
                а мы, между прочим,<br/>
                только что хинкали сварили.
              </p>
            </div>

						{
							time && time.status === DILIVERY_TIME_STATUS.NODELIVERY &&
							<div className="link-to-cart__empty">
              <h1>
							Привет!<br />
							Заказ уже <br />
							недоступен.
              </h1>
              <p>
							Хинкальная скоро закроется.
              </p>
            </div>
						}
          </div>
        </div>
      </div>
    )
}

export default memo(ShopLinkToCart);
