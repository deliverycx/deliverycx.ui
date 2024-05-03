import { validationHIdiscount } from "application/helpers/validationHIdiscount"
import { basketModel } from "modules/BasketModule/basket.module"
import { IBasketPrice, ICartProd } from "modules/BasketModule/interfaces/basket.type"
import { useState, useEffect, FC, memo } from "react"

const CartDiscount:FC<{cartList:ICartProd[],basketPrice:IBasketPrice}> = ({cartList,basketPrice}) => {
	const [countDiscount, setCountDiscount] = useState(0)
	const [freeHi, setFreeHi] = useState(0)
	

	const { count, free } = validationHIdiscount(cartList)

	
	useEffect(() => {
		if (count !== 0) {
			setCountDiscount(count)
			setFreeHi(free)
		}
	}, [count])

	console.log(basketPrice.discounts);

	return (
		<>
		{
				countDiscount !== 0 && (countDiscount == 11 && (
					<div className="basket__content__dozen dozen--one_more">
						<div className="basket__content__dozen__item dozen--one_more__item">
							<h3 className="basket__content__dozen__item-title dozen--one_more__item-tile">Пожалуйста, добавьте ещё 1 хинкали</h3>
							<div className="basket__content__dozen__item-addition dozen--one_more__item-addition">Принимается заказ от 3-х хинкали с ЛЮБОЙ начинкой</div>
						</div>
					</div>))
			}
			{
				countDiscount !== 0 && (countDiscount >= 12 && (
					<div className="basket__content__dozen dozen--gift">
                        <div className="basket__content__dozen__item">
                            <div className="basket__content__dozen__item__icon">
                                <img src={require("assets/images/icons/khinkali-icon.png")} alt=""/>
                                <div className="basket__content__dozen__item__icon-numb">
																{free !== 0 ? free : '1'}
                                </div>
                            </div>
                            <div className="basket__content__dozen__item__content">
                                <h3 className="basket__content__dozen__item__content-title">хинкали в подарок!</h3>
                                <div className="basket__content__dozen__item__content-addition">Условия акции выполнены</div>
                            </div>
                        </div>
                    </div>
				))
			}
			{
				countDiscount !== 0 && (countDiscount < 11 && 
					(
						<div className="basket__content__dozen dozen--discount">
                        <div className="basket__content__dozen__item">
                            <div className="basket__content__dozen__item__icon">
                                <img src={require("assets/images/icons/khinkali-icon.png")} alt=""/>
                                <div className="basket__content__dozen__item__icon-numb">
                                    {12 - countDiscount}
                                </div>
                            </div>
                            <div className="basket__content__dozen__item__content">
                                <h3 className="basket__content__dozen__item__content-title">хинкали до ДЮЖИНЫ!</h3>
                                <div className="basket__content__dozen__item__content-addition">при заказе 12-ти вы платите за 11!</div>
                            </div>
                        </div>
                    </div>))
			}

			{
				basketPrice.discounts.forhach && !basketPrice.discounts.forhach.active &&
				<div className="basket__content__dozen dozen--discount">
                        <div className="basket__content__dozen__item">
                            <div className="basket__content__dozen__item__icon">
                                
                                <div className="basket__content__dozen__item__icon-numb">
                                    {basketPrice.discounts.forhach.coutn}
                                </div>
                            </div>
                            <div className="basket__content__dozen__item__content">
                                <h3 className="basket__content__dozen__item__content-title">осталось до акции</h3>
                                <div className="basket__content__dozen__item__content-addition">заказывайте 4 любых наших пирога или хачапури всего за 1099₽!</div>
                            </div>
                        </div>
                    </div>

			}
			{
				basketPrice.discounts.forhach && basketPrice.discounts.forhach.active &&
				<div className="basket__content__dozen dozen--gift">
                        <div className="basket__content__dozen__item">
                            
                            <div className="basket__content__dozen__item__content">
                                <h3 className="basket__content__dozen__item__content-title">Условия акции выполнены</h3><br />
																<h4 className="basket__content__dozen__item__content-title">Детали заказа и акции уточните у администратора. Благодарим!</h4>
                                <div className="basket__content__dozen__item__content-addition">Условия акции выполнены
																заказывайте 4 любых наших пирога или хачапури всего за 1099₽! <br/>
																
																</div>
																
                            </div>
                        </div>
                    </div>
			}
		</>
	)
}
export default memo(CartDiscount)