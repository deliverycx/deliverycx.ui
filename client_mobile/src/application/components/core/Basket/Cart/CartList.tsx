import { ICartProd } from "modules/BasketModule/interfaces/basket.type"
import { FC, memo } from 'react';
import HOCCartChange from "../CartChange/HOC.CartChange";
import { basketUseCase } from "modules/BasketModule/basket.module";

type IProps = {
	product: ICartProd
	select:string[]
	choise:any
}

const CartList: FC<IProps> = ({ product,choise,select }) => {


	return (
		<>
			<div className="basket__content__product_card">
				<label className="input__checkbox">
					<div className="checkbox">
						<input type="checkbox" checked={select.includes(product.id)} onChange={e => choise(e,product.id)} />
						<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.71047 10.2901C5.32047 10.6801 4.69047 10.6801 4.30047 10.2901L0.710469 6.70006C0.320469 6.31006 0.320469 5.68006 0.710469 5.29006C1.10047 4.90006 1.73047 4.90006 2.12047 5.29006L5.00047 8.17006L11.8805 1.29006C12.2705 0.900059 12.9005 0.900059 13.2905 1.29006C13.6805 1.68006 13.6805 2.31006 13.2905 2.70006L5.71047 10.2901Z" fill="white"></path></svg>
					</div>
				</label>
				<div className="basket__content__product_card-img">
					<img src={product.productImage} alt="" className="" />
				</div>
				<div className="basket__content__product_card__info">
					<div className="basket__content__product_card__info__price">
						<div className="basket__content__product_card__info__price__data">
							<div className="basket__content__product_card__info__price__data-title">
								{product.productName}
							</div>
							<div className="basket__content__product_card__info__price__data-price">
								{product.oneprice} ₽ / шт.
							</div>
						</div>
						<div className="basket__content__product_card__info__price-cost price--cost">

							<h3>{product.price} ₽</h3>
						</div>
					</div>
					<div className="basket__content__product_card__info__buttons">
						<button onClick={()=> basketUseCase.removeOneCart(product.id)} className="btn btn-mini btn-gray">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
								<path d="M12.2005 3.80665C11.9405 3.54665 11.5205 3.54665 11.2605 3.80665L8.00047 7.05998L4.74047 3.79998C4.48047 3.53998 4.06047 3.53998 3.80047 3.79998C3.54047 4.05998 3.54047 4.47998 3.80047 4.73998L7.06047 7.99998L3.80047 11.26C3.54047 11.52 3.54047 11.94 3.80047 12.2C4.06047 12.46 4.48047 12.46 4.74047 12.2L8.00047 8.93998L11.2605 12.2C11.5205 12.46 11.9405 12.46 12.2005 12.2C12.4605 11.94 12.4605 11.52 12.2005 11.26L8.94047 7.99998L12.2005 4.73998C12.4538 4.48665 12.4538 4.05998 12.2005 3.80665Z" fill="#8D191D" />
							</svg>
						</button>
						<HOCCartChange theme="basket" product={product} />

					</div>


				</div>
			</div>
		</>
	)
}
export default CartList