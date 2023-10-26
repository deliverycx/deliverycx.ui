import { CircularProgress } from "@mui/material"
import convertWeight from "application/helpers/convertWeight"
import { IProduct, IStopList } from "modules/ShopModule/interfaces/shop.type"
import React, { useEffect, useState } from "react"
import { FC } from "react"
import ImageLoader from "react-imageloader"
import HOCCartChange from "../../Basket/CartChange/HOC.CartChange"
import cn from "classnames"

type IProps = {
	product: IProduct
	setModalmodalProduct: any
	stoplist:IStopList[] | null
}


const PoductListItem: FC<IProps> = ({ product, setModalmodalProduct,stoplist }) => {
	
	const [disableItem,setDisableItem] = useState(false)


	useEffect(() => {
    if (stoplist && product) {
			stoplist.forEach((item: IStopList) => {
        item.productId === product.id && setDisableItem(true)
      })
    }

  },[stoplist])

	const CN = cn('products product-card', { ended: disableItem })
	return (
		<div className={CN}>
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
					!disableItem ?
						<HOCCartChange theme="list" product={product} />
						: <button className="addtocart" disabled={true}>Будет позже</button>
				}

			</div>
		</div>
	)
}
export default PoductListItem