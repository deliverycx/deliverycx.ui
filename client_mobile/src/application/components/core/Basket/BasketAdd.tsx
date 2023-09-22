import { basketUseCase } from "modules/BasketModule/basket.module"
import { FC, useEffect } from "react"
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { BasketCountViewModel } from "./Basket.viewModel";

type IProps = {
	theme: "list" | "card" | "basket"
	product: IProduct
}

const BasketAdd: FC<IProps> = ({ theme, product }) => {
	const useCase = adapterComponentUseCase(BasketCountViewModel, product)
	const { changeCount } = useCase.data
	const { changeCountHandler } = useCase.handlers

	if (theme === 'list') {
		return (
			<>
				<div className="input__counter input__counter-sm no-drag">
					<div
						className={
							changeCount <= 1
								? "cart__item__disable"
								: "cart__item__decriment"
						}
						onClick={(e) =>
							changeCountHandler({
								id: product.id,
								type: "dec",
							})
						}
					>
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M17.9999 14.6668H9.99992C9.63325 14.6668 9.33325 14.3668 9.33325 14.0002C9.33325 13.6335 9.63325 13.3335 9.99992 13.3335H17.9999C18.3666 13.3335 18.6666 13.6335 18.6666 14.0002C18.6666 14.3668 18.3666 14.6668 17.9999 14.6668Z" fill="#111111" />
						</svg>
					</div>

					<input type="number" value={changeCount} />
					<div
                        className="cart__item__increment"
                        onClick={(e) =>
                            changeCountHandler({
                                id: product.id,
                                type: "inc",

                            })
                        }
                    >
                       <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M17.9999 14.6668H14.6666V18.0002C14.6666 18.3668 14.3666 18.6668 13.9999 18.6668C13.6333 18.6668 13.3333 18.3668 13.3333 18.0002V14.6668H9.99992C9.63325 14.6668 9.33325 14.3668 9.33325 14.0002C9.33325 13.6335 9.63325 13.3335 9.99992 13.3335H13.3333V10.0002C13.3333 9.6335 13.6333 9.3335 13.9999 9.3335C14.3666 9.3335 14.6666 9.6335 14.6666 10.0002V13.3335H17.9999C18.3666 13.3335 18.6666 13.6335 18.6666 14.0002C18.6666 14.3668 18.3666 14.6668 17.9999 14.6668Z" fill="#111111" />
					</svg>
                    </div>
					
				</div>
				<button className="addtocart" onClick={() => basketUseCase.addtoBasket(product)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 16" fill="none">
						<path d="M12.4999 8.66781H9.16659V12.0011C9.16659 12.3678 8.86659 12.6678 8.49992 12.6678C8.13325 12.6678 7.83325 12.3678 7.83325 12.0011V8.66781H4.49992C4.13325 8.66781 3.83325 8.36781 3.83325 8.00114C3.83325 7.63447 4.13325 7.33447 4.49992 7.33447H7.83325V4.00114C7.83325 3.63447 8.13325 3.33447 8.49992 3.33447C8.86659 3.33447 9.16659 3.63447 9.16659 4.00114V7.33447H12.4999C12.8666 7.33447 13.1666 7.63447 13.1666 8.00114C13.1666 8.36781 12.8666 8.66781 12.4999 8.66781Z" />
					</svg>
					Добавить
				</button>
			</>
		)
	}


}
export default BasketAdd