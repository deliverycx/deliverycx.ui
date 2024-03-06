import convertWeight from "application/helpers/convertWeight"
import { ICategory, IProduct } from "modules/ShopModule/interfaces/shop.type"
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
import PoductListItem from "./PoductListItem"


type IProps = {
	nomenclatureProducts: IProduct[]
	selectCat:ICategory
}
const HOCProducts: FC<IProps> = ({ nomenclatureProducts,selectCat }) => {
	const useCase = adapterComponentUseCase(useProductsViewModel,{products:nomenclatureProducts,selectCat} )
	const { selectProduct,stopList,selectCategory } = useCase.data


	const [modalProduct, setModalmodalProduct] = useState<IProduct | boolean>(false)
	//console.log(selectProduct,selectCategory.name);
	return (
		<>
			{
				selectProduct && selectCategory && selectProduct.length !== 0 ? selectProduct.map((product: IProduct, index: number) => {
					
					return (selectCategory.id === product.category) && <PoductListItem key={index} product={product} stoplist={stopList} setModalmodalProduct={setModalmodalProduct} />
				})
					: "Эта категория пуста :("
			}

			{
				modalProduct &&
				<ProductCard setIsModalOpened={setModalmodalProduct} product={modalProduct as IProduct} stoplist={stopList} />
			}
		</>

	)
}
export default observer(HOCProducts)