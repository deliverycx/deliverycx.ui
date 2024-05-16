import { validationHIdiscount } from "application/helpers/validationHIdiscount"
import { observer } from "mobx-react-lite"
import { basketUseCase } from "modules/BasketModule/basket.module"
import { ICartProd } from "modules/BasketModule/interfaces/basket.type"
import { useState, useEffect, FC, memo } from "react"

const CartDiscount:FC<{cartList:ICartProd[]}> = ({cartList}) => {
	const [countDiscount, setCountDiscount] = useState(0)
	const [freeHi, setFreeHi] = useState(0)
	const { cart, basketPrice } = basketUseCase.basketModel

	const { count, free } = validationHIdiscount(cart)


	useEffect(() => {
		if (count !== 0) {
			setCountDiscount(count)
			setFreeHi(free)
		}else{
			setCountDiscount(0)
		}
	}, [count])

	return (
		<>
		{
				countDiscount !== 0 && (countDiscount == 11 && (
					<div className="basket__content__dozen dozen--one_more">
						<div className="basket__content__dozen__item dozen--one_more__item">
							<h3 className="basket__content__dozen__item-title dozen--one_more__item-tile"><svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.0001 1.98993L17.5301 14.9999H2.47012L10.0001 1.98993ZM0.740121 13.9999C-0.0298788 15.3299 0.930121 16.9999 2.47012 16.9999H17.5301C19.0701 16.9999 20.0301 15.3299 19.2601 13.9999L11.7301 0.989932C10.9601 -0.340068 9.04012 -0.340068 8.27012 0.989932L0.740121 13.9999ZM9.00012 6.99993V8.99993C9.00012 9.54993 9.45012 9.99993 10.0001 9.99993C10.5501 9.99993 11.0001 9.54993 11.0001 8.99993V6.99993C11.0001 6.44993 10.5501 5.99993 10.0001 5.99993C9.45012 5.99993 9.00012 6.44993 9.00012 6.99993ZM9.00012 11.9999H11.0001V13.9999H9.00012V11.9999Z" fill="#8D191D" />
</svg>
<span>Пожалуйста, добавьте ещё 1 хинкали</span></h3>
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
		</>
	)
}
export default observer(CartDiscount)