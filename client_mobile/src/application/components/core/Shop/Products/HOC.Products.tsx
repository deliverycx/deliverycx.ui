import convertWeight from "application/helpers/convertWeight"
import { IProduct } from "modules/ShopModule/interfaces/shop.type"
import React, { useState } from "react"
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { data } from "yandex-maps"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useProductsViewModel } from "./Products.viewModel"
import { observer } from "mobx-react-lite"
import cn from "classnames"
import ProductCard from "./ProductCard"

type IProps = {
	nomenclatureProducts: IProduct[]
}
const HOCProducts: FC<IProps> = ({ nomenclatureProducts }) => {
	const useCase = adapterComponentUseCase(useProductsViewModel, nomenclatureProducts)
	const { selectProduct } = useCase.data

	const [modalProduct, setModalmodalProduct] = useState<IProduct | boolean>(false)

	return (
		<>
			{
				selectProduct && selectProduct.length ? selectProduct.map((product: IProduct, index: number) => {
					const CN = cn('products product-card', { ended: product.stoplist })
					return (
						<div className={CN} key={index}>
							<div className="product-card-img">
								<img src={product.image} alt={product.name} onClick={()=> setModalmodalProduct(product)} />
								<div className="product-card-sale">-123%</div>
								<div className="product-card-ended">

									Упс..
									<br />
									Закончилось
								</div>
							</div>
							<div className="product-card__content" onClick={()=> setModalmodalProduct(product)}>
								<h5 className="product-card__content-title">
									{product.name}
								</h5>
								<div className="product-card__content__info">
									<small className="product-card__content__info-weight">
										{
											product.measureUnit === "порц"
												? `${convertWeight(product.weight)} г` :
												product.measureUnit === "мл" ? product.weight + 'мл'
													: "1 шт"
										}
									</small>
									<h3 className="product-card__content__info-cost price--cost">

										{product.price} ₽
									</h3>
								</div>
							</div>
							<div className="product-card__button">
								{
									!product.stoplist ?
										<button className="addtocart">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 16" fill="none">
												<path d="M12.4999 8.66781H9.16659V12.0011C9.16659 12.3678 8.86659 12.6678 8.49992 12.6678C8.13325 12.6678 7.83325 12.3678 7.83325 12.0011V8.66781H4.49992C4.13325 8.66781 3.83325 8.36781 3.83325 8.00114C3.83325 7.63447 4.13325 7.33447 4.49992 7.33447H7.83325V4.00114C7.83325 3.63447 8.13325 3.33447 8.49992 3.33447C8.86659 3.33447 9.16659 3.63447 9.16659 4.00114V7.33447H12.4999C12.8666 7.33447 13.1666 7.63447 13.1666 8.00114C13.1666 8.36781 12.8666 8.66781 12.4999 8.66781Z" />
											</svg>
											Добавить
										</button>
										: <button className="addtocart" disabled={true}>Будет позже</button>
								}

							</div>
						</div>
					)
				})
					: "Эта категория пуста :("
			}

			{
				modalProduct &&
				<ProductCard setIsModalOpened={setModalmodalProduct} product={modalProduct as IProduct} />
			}
		</>

	)
}
export default observer(HOCProducts)