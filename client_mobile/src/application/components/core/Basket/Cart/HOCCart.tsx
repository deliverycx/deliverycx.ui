import { ICartProd } from "modules/BasketModule/interfaces/basket.type";
import { useCartViewModel } from "./Cart.viewModel";
import CartList from "./CartList"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { observer } from "mobx-react-lite";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { FC, memo, useState } from "react";
import ModalCard from "application/components/common/Modals/ModalCard";

const HOCCart:FC<{cart:ICartProd[]}> = ({cart}) => {
	const useCase = adapterComponentUseCase(useCartViewModel,cart)
	const { select } = useCase.data
	const { dispatchSelectCart, selectAllCart, removeSelectItems } = useCase.handlers

	return (
		<>
			<div className="basket__content__buttons">
				<label className="input__checkbox">
					<div className="checkbox">
						<input type="checkbox" onChange={selectAllCart} />
						<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.71047 10.2901C5.32047 10.6801 4.69047 10.6801 4.30047 10.2901L0.710469 6.70006C0.320469 6.31006 0.320469 5.68006 0.710469 5.29006C1.10047 4.90006 1.73047 4.90006 2.12047 5.29006L5.00047 8.17006L11.8805 1.29006C12.2705 0.900059 12.9005 0.900059 13.2905 1.29006C13.6805 1.68006 13.6805 2.31006 13.2905 2.70006L5.71047 10.2901Z" fill="white"></path></svg>
					</div>
					<p className="input__checkbox-label">
						Выбрать всё
					</p>
				</label>
				{
					select.length !== 0 &&
					<button className="btn btn-none btn-icon-modal" onClick={removeSelectItems}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18.2997 5.70997C17.9097 5.31997 17.2797 5.31997 16.8897 5.70997L11.9997 10.59L7.10973 5.69997C6.71973 5.30997 6.08973 5.30997 5.69973 5.69997C5.30973 6.08997 5.30973 6.71997 5.69973 7.10997L10.5897 12L5.69973 16.89C5.30973 17.28 5.30973 17.91 5.69973 18.3C6.08973 18.69 6.71973 18.69 7.10973 18.3L11.9997 13.41L16.8897 18.3C17.2797 18.69 17.9097 18.69 18.2997 18.3C18.6897 17.91 18.6897 17.28 18.2997 16.89L13.4097 12L18.2997 7.10997C18.6797 6.72997 18.6797 6.08997 18.2997 5.70997Z" fill="#8D191D" />
						</svg>
						Удалить выбранные
					</button>
				}


			</div>
			{
				cart ?
					cart.map((value: ICartProd) => {
						return <CartList key={value.id} select={select} choise={dispatchSelectCart} product={value} />
					})
					: <LoaderProduct />
			}

		</>

	)
}
export default memo(HOCCart)