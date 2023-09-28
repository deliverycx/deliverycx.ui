import { validationHIdiscount } from "application/helpers/validationHIdiscount"
import { observer } from "mobx-react-lite"
import { basketUseCase } from "modules/BasketModule/basket.module"
import { ICartProd } from "modules/BasketModule/interfaces/basket.type"
import { useState, useEffect, FC, memo } from "react"

const CartDiscount:FC<{cartList:ICartProd[]}> = ({cartList}) => {
	const [countDiscount, setCountDiscount] = useState(0)
	const [freeHi, setFreeHi] = useState(0)

	const { count, free } = validationHIdiscount(cartList)


	useEffect(() => {
		if (count !== 0) {
			setCountDiscount(count)
			setFreeHi(free)
		}
	}, [count])

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
                                    {countDiscount}
                                </div>
                            </div>
                            <div className="basket__content__dozen__item__content">
                                <h3 className="basket__content__dozen__item__content-title">хинкали до ДЮЖИНЫ!</h3>
                                <div className="basket__content__dozen__item__content-addition">при заказе 12-ти вы платите за 11!</div>
                            </div>
                        </div>
                    </div>))
			}
		</>
	)
}
export default memo(CartDiscount)