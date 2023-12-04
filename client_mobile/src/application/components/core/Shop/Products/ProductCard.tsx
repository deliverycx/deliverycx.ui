import ModalCard from "application/components/common/Modals/ModalCard"
import { FC, useEffect, useState } from "react"
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import cn from "classnames"
import HOCCartChange from "../../Basket/CartChange/HOC.CartChange";
import { IStopList } from 'modules/ShopModule/interfaces/shop.type';
import AdditionSouses from "./AdditionProducts/AdditionSouses";

type IProps = {
	product: IProduct
	setIsModalOpened: (toggle: boolean) => void
	stoplist:IStopList[] | null
}
const ProductCard: FC<IProps> = ({ product, setIsModalOpened,stoplist }) => {
	const [disableItem,setDisableItem] = useState(false)
	const CN = cn('modal', { ended: disableItem })


	useEffect(() => {
    if (stoplist) {
			stoplist.forEach((item: IStopList) => {
        item.productId === product.id && setDisableItem(true)
      })
    }

  },[stoplist])
	
	return (
		<div className="product">
			<ModalCard setIsOpened={setIsModalOpened}>
				<div className={CN}>
					<div className="modal__wrapper">
						<div className="product__modal-img">

							<img src={product.image} alt={product.name} />
							{
								disableItem &&
								<div className="product-card-ended">
									Упс..
									<br />
									Закончилось
								</div>
							}

						</div>
						<div className="product__modal-content no-drag">
							<svg className="no-drag product__modal-close" onClick={() => setIsModalOpened(false)} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M30.3 17.7102C29.91 17.3202 29.28 17.3202 28.89 17.7102L24 22.5902L19.11 17.7002C18.72 17.3102 18.09 17.3102 17.7 17.7002C17.31 18.0902 17.31 18.7202 17.7 19.1102L22.59 24.0002L17.7 28.8902C17.31 29.2802 17.31 29.9102 17.7 30.3002C18.09 30.6902 18.72 30.6902 19.11 30.3002L24 25.4102L28.89 30.3002C29.28 30.6902 29.91 30.6902 30.3 30.3002C30.69 29.9102 30.69 29.2802 30.3 28.8902L25.41 24.0002L30.3 19.1102C30.68 18.7302 30.68 18.0902 30.3 17.7102Z" fill="#8D191D" />
							</svg>
							<div className="product__modal-header">
								<h2>{product.name}</h2>
								<div className="product__modal-header-price price--cost">

									<h1 className="product-price">{product.price} ₽</h1>
								</div>
							</div>
							
							<div className="product__modal-desc">
								<p>
									{product.description}
								</p>
							</div>
							<AdditionSouses />
							{
								!disableItem ?
										<HOCCartChange theme="card" product={product} close={setIsModalOpened} />
									: <div className="product__modal-buttons">
										<div className="input__counter input__counter-sm no-drag">

											<button disabled={true} className="btn btn-md btn-red no-drag">
												Будет позже
											</button>
										</div>
									</div>
							}

						</div>
					</div>
				</div>
			</ModalCard>
		</div>
	)
}
export default ProductCard