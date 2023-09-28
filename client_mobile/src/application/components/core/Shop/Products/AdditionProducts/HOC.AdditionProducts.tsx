import { requestShopApi } from "modules/ShopModule/data/shop.request"
import { IProduct } from "modules/ShopModule/interfaces/shop.type";
import { shopUseCase } from "modules/ShopModule/shop.module";
import { useEffect } from 'react';
import { useState } from 'react';
import cn from "classnames"
import { CircularProgress } from "@mui/material";
import HOCCartChange from "application/components/core/Basket/CartChange/HOC.CartChange";
import convertWeight from "application/helpers/convertWeight";
import React from "react";
import ImageLoader from "react-imageloader";
import ProductCard from "../ProductCard";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";

const HOCAdditionProducts = () => {
	const [additionProducts, setAdditionProducts] = useState<IProduct[] | null>()
	const [modalProduct, setModalmodalProduct] = useState<IProduct | boolean>(false)

	useEffect(() => {
		shopUseCase.additionProducts().then((data) => {
			data && data.length && setAdditionProducts(data)
		})
	}, [])

	return (
		<div className="basket__more">
			<h3 className="basket__more-title">Может, что‑нибудь ещё?</h3>
			<div className="basket__more__content">
				{
					additionProducts ?
					additionProducts.map((product, index: number) => {
						const CN = cn('products product-card', { ended: product.stoplist })
						return (
							<div className={CN} key={index}>
								<div className="product-card-img" onClick={() => setModalmodalProduct(product)}>

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
											<HOCCartChange theme="list" product={product} />
											: <button className="addtocart" disabled={true}>Будет позже</button>
									}

								</div>
							</div>
						)
					})
					: <LoaderProduct />
				}
				{
					modalProduct &&
					<ProductCard setIsModalOpened={setModalmodalProduct} product={modalProduct as IProduct} />
				}
			</div>
		</div>
	)
}
export default HOCAdditionProducts