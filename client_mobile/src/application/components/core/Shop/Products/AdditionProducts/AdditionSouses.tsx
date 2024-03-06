import { shopUseCase } from 'modules/ShopModule/shop.module';
import { FC, useEffect, useState } from 'react';
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import HOCCartChange from 'application/components/core/Basket/CartChange/HOC.CartChange';

const AdditionSouses:FC<{set:any}> = ({set}) => {
	const [souses, setSouses] = useState<IProduct[] | null>(null)

	const getSous = async () => {
		try {
			const result = await shopUseCase.sousesProducts()
			result && setSouses(result)
		} catch (error) {
			console.log(error);
			setSouses(null)
		}
	}

	useEffect(() => {
		getSous()
	}, [])

	return (
		<div className="product__modal-additional">
			{souses && <h3>Добавить к заказу</h3>}
			{
				souses && souses.map((product) => {
					return product && (
						<div key={product.id} className="additional-item">
							<div className="input__checkbox no-drag">
								<div className="checkbox">
									<img src={product.image} width="50" />
								</div>
								<div className="input__checkbox-label">
									<strong>{product.name}</strong>
									
								</div>
							</div>
							<div className="button_souse product-card__button">
								<HOCCartChange theme="list" product={product} />
							</div>
						</div>

					)
				})
			}

			
		</div>
	)
}
export default AdditionSouses