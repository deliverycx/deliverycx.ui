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
import ImageLoader from 'react-imageloader';
import { CircularProgress } from "@mui/material"
import HOCCartChange from "../../Basket/CartChange/HOC.CartChange"


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
							<div className="product-card-img" onClick={()=> setModalmodalProduct(product)}>

								<ImageLoader
									src={product.image}
									wrapper={React.createFactory('div')}
									preloader={() => <CircularProgress color="primary" />}>
									{product.name}
								</ImageLoader>
								<div className="product-card-sale">-123%</div>
								<div className="product-card-ended">

									Упс..
									<br />
									Закончилось
								</div>
							</div>
							<div className="product-card__content" onClick={() => setModalmodalProduct(product)}>
								<h5 className="product-card__content-title">
									{product.name}
								</h5>
								<div className="product-card__content__info">
									<small className="product-card__content__info-weight">
										{
											product.measureUnit === "порц"
												? `${convertWeight(product.weight)} гр` :
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
										<HOCCartChange theme="list" product={product} />
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