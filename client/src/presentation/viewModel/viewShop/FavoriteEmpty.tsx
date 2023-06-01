import { adapterSelector } from "servises/redux/selectors/selectors";
import { IProduct } from '@types';
import ShopProductItems from "application/components/core/Shop/ShopProductItems";
import { useGetFavoritesQuery } from "servises/repository/RTK/RTKShop";
import { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RequestShop } from "servises/repository/Axios/Request";

/* eslint-disable @typescript-eslint/no-var-requires */

type IProps = {
	products: IProduct[]
}
const FavoriteEmpty: FC<IProps> = ({ products }): JSX.Element => {
	/*
	const { data: favorites, isFetching } = useGetFavoritesQuery('',{
    refetchOnMountOrArgChange:true,
  })
	*/
	const [favorites,setFavorites] = useState<any>(null)

	const getFavorite = async () =>{
		try {
			const {data} = await RequestShop.getFavorites()
			data && setFavorites(data)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		products && getFavorite()
	},[])

	return (
		<>
			{
				favorites && favorites.length !== 0
					? favorites.map((product: IProduct) => {
					return <ShopProductItems key={product.id} products={product} />
				})
					: (
						<div className="favorite_empty">
							<div className="favorite_empty__title">
								<span className="favorite_empty__title-red">Добавляй в избранное</span>
								<span>свои любимые блюда</span>
							</div>
							<img className="favorite_empty__img" src={require("assets/img/favorite_empty.png").default} />
						</div>
					)

			}
		</>
	)
}
export default FavoriteEmpty;