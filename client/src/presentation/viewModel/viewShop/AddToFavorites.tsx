import { FC, memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { debounce } from "lodash";
import { RequestShop } from "servises/repository/Axios/Request";
import { setFavorites } from "servises/redux/slice/shopSlice";
import { IProduct } from '@types';
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { useGetFavoritesQuery } from "servises/repository/RTK/RTKShop";

interface IProps {
	product: IProduct,
	isFav: boolean,
	_class: string
}

const AddToFavorites: FC<IProps> = ({ product, isFav, _class }) => {
	const [isActive, setIsActive] = useState<boolean>(isFav);
	const dispatch = useDispatch();
	const [favorites,setFavorites] = useState<any>(null)

	const favoriteCN = cn(_class, { favorite_active: isActive });

	

	const getFavorite = async () =>{
		try {
			const {data} = await RequestShop.getFavorites()
			console.log(data);
			data && data.length !== 0 && data.forEach((value: any) => {
				if (value.id === product.id) {
					setIsActive(true)
				}
			})
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		product && getFavorite()
	},[product])

	const debaunceHandleClick = debounce(async () => {
		try {
			//dispatch(setFavorites(product))
			const {data} = await RequestShop.addFavorites({productId: product})
			console.log(data);
			setIsActive(data.isFav);
		} catch (error) {
			console.log(error);
		}
		

	}, 400);

	return <button className={favoriteCN} onClick={debaunceHandleClick}></button>
}

export default memo(AddToFavorites);