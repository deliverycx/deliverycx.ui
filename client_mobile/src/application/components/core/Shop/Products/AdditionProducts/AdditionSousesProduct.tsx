/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { observer } from "mobx-react-lite";
import { basketModel, basketUseCase } from "modules/BasketModule/basket.module";
import { IProduct } from "modules/ShopModule/interfaces/shop.type";
import { FC, useEffect, useMemo, useState } from "react";
import { debounce } from "rxjs";

const AdditionSousesProduct: FC<{ product: IProduct,parent:string }> = ({ product,parent }) => {
	const { cartAddional, cart } = basketModel
	const [changeCount, setChangeCount] = useState<number>(0)

	useEffect(() => {
		const findProdSous = basketUseCase.findSousCart(product.productId,parent)
		const cartid = basketUseCase.findIdCart(product.productId)
		if(findProdSous && cartid){
			setChangeCount(findProdSous.count)
		}else{
			setChangeCount(0)
		}
		//console.log(findProdSous,cartid);

		if(findProdSous && !cartid){
			basketModel.cartAddionalDeleteSous(findProdSous.sousid,parent)
		}
	}, [cart,cartAddional, parent])

	const changeCountHandler = ({ id, type, code }: any) => {

		if (typeof changeCount === 'number') {
			switch (type) {
				case 'inc':
					setChangeCount(prev => {
						let count = typeof prev === 'number' ? prev + 1 : 1
						changeHandler(id,count)
						return count
					});
					break;
				case 'dec':

					setChangeCount(prev => {
						let count = Number(prev) - 1
						//debouncedChangeHandler({ id, count })
						changeHandler(id,count)
						return count
					});
					
					break;
				default: setChangeCount(0)
			}

		} else {
			setChangeCount(prev => {

				changeHandler(id,1)
				return 1
			})
		}
	}

	const handlerAddCard = (product: IProduct) => {
		basketUseCase.addtionalSousCart(product,parent)
	}

	const changeHandler = (id:string,count:number) =>{
		const findProdSous = basketUseCase.findSousCart(id,parent)
		findProdSous && basketUseCase.changeSousCart(findProdSous,count,parent)
	}
	//console.log('cart',cartAddional);

	return (
		<div className="additional-item">
			<div className="input__checkbox no-drag addsous">
				<input className="custom-checkbox" type="checkbox" checked={changeCount !== 0} onClick={() => handlerAddCard(product)} id={`color-1-${product.id}`} name={`color-1-${product.id}`} />
				<label htmlFor={`color-1-${product.id}`}></label>

				<div className="additional-item-img">
					<img src={product.image} width="50" />
				</div>
				<div className="input__checkbox-label">
					<strong>{product.name}</strong>

				</div>
			</div>
			{changeCount !== 0 &&
				<div className="button_souse product-card__button">
					<div className="input__counter input__counter-sm basket__content__product_card__info__buttons-input">
						<div
							className={
								changeCount <= 1
									? "cart__item__disable"
									: "cart__item__decriment"
							}
							onClick={(e) =>
								changeCountHandler({
									id: product.productId,
									type: "dec",
								})
							}
						>
							<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.9999 14.6668H9.99992C9.63325 14.6668 9.33325 14.3668 9.33325 14.0002C9.33325 13.6335 9.63325 13.3335 9.99992 13.3335H17.9999C18.3666 13.3335 18.6666 13.6335 18.6666 14.0002C18.6666 14.3668 18.3666 14.6668 17.9999 14.6668Z" fill="#111111"></path>
							</svg>
						</div>
						<input type="number" value={changeCount} />
						<div
							className={
								changeCount <= 1
									? "cart__item__disable"
									: "cart__item__decriment"
							}
							onClick={(e) =>
								changeCountHandler({
									id: product.productId,
									type: "inc",
								})
							}
						>
							<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.9999 14.6668H14.6666V18.0002C14.6666 18.3668 14.3666 18.6668 13.9999 18.6668C13.6333 18.6668 13.3333 18.3668 13.3333 18.0002V14.6668H9.99992C9.63325 14.6668 9.33325 14.3668 9.33325 14.0002C9.33325 13.6335 9.63325 13.3335 9.99992 13.3335H13.3333V10.0002C13.3333 9.6335 13.6333 9.3335 13.9999 9.3335C14.3666 9.3335 14.6666 9.6335 14.6666 10.0002V13.3335H17.9999C18.3666 13.3335 18.6666 13.6335 18.6666 14.0002C18.6666 14.3668 18.3666 14.6668 17.9999 14.6668Z" fill="#111111"></path>
							</svg>
						</div>
					</div>
				</div>
			}

		</div>
	)
}
export default observer(AdditionSousesProduct) 