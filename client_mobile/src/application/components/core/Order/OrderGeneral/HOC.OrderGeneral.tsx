import { observer } from "mobx-react-lite"
import { basketModel } from "modules/BasketModule/basket.module"

const HOCOrderGeneral = () => {
	const {cart,basketPrice} = basketModel

	console.log(basketPrice);

	return(
		<div className="order-placement__check">
                            <div className="order-placement__check__info">
                                <h2 className="order-placement__check__info-title">Ваш заказ</h2>
                                <div className="order-placement-remained__content__list order-placement__check__info__list">
                                    {cart && cart.map((value,i) => (
                                        <div key={i} className="order-placement-remained__content__list__item">
                                            <div className="order-placement-remained__content__list__item__info">
                                                <div className="order-placement-remained__content__list__item__info-title">{value.productName}</div>
                                                <div className="order-placement-remained__content__list__item__info-cost price--cost">
                                                    
                                                    <h5>{value.price} ₽</h5>
                                                </div>
                                            </div>
                                            <div className="order-placement-remained__content__list__item-price">
																						{value.oneprice}₽  {value.amount !== 1 && `× ${value.amount} шт.` } 
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-placement__check__info__price">
                                    <h3 className="order-placement__check__info__price-title">Стоимость заказа</h3>
                                    <div className="order-placement__check__info__price-cost price--cost">
                                        
                                        <h3>{basketPrice?.totalPrice} ₽</h3>
                                    </div>
                                </div>
                                <div className="order-placement__check__info__delivery">
                                    <div className="order-placement__check__info__delivery__price">
                                        <h3 className="order-placement__check__info__delivery__price-title">Доставка</h3>
                                        <div className="order-placement__check__info__delivery__price-cost">
                                            <span></span>
                                            Бесплатно
                                        </div>
                                    </div>
                                    <div className="order-placement__check__info__delivery__info">
                                        <div className="order-placement__check__info__delivery__info-time">В ближайшее время</div>
                                        <div className="order-placement__check__info__delivery__info-contact">Username +7 999 999-99-99</div>
                                        <div className="order-placement__check__info__delivery__info-addresses">ул. Севастопольская, д. 26, кв. 2, Симферополь</div>
                                        <div className="order-placement__check__info__delivery__info-additional">
                                            <img src={require("assets/images/icons/info_green.png")} alt=""/>
                                            Для бесплатной доставки добавьте ещё на
                                            <span>850 ₽</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-placement__check__info__total">
                                    <h2 className="order-placement__check__info__total-title">Итого</h2>
                                    <div className="order-placement__check__info__total-cost price--cost">
                                        <span>700 ₽</span>
                                        <h2>550 ₽</h2>
                                    </div>
                                </div>
                                <div className="order-placement__check__info__payment">
                                    <h3 className="order-placement__check__info__payment-title">Оплата</h3>
                                    <div className="order-placement__check__info__payment__info">
                                        <div className="order-placement__check__info__payment__info__item">
                                            <div className="order-placement__check__info__payment__info__item-name">Наличными</div>
                                            <div className="order-placement__check__info__payment__info__item-cost">2 000 ₽</div>
                                        </div>
                                        <div className="order-placement__check__info__payment__info__item">
                                            <div className="order-placement__check__info__payment__info__item-name">Сдача</div>
                                            <div className="order-placement__check__info__payment__info__item-cost">1 400 ₽</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
	)
}
export default observer(HOCOrderGeneral)