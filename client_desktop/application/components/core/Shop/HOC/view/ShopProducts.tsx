import { IProduct } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import { useCaseShop } from "domain/use-case/useCaseShop"
import { FC } from "react"
import FavoriteEmpty from "../../Presentation/FavoriteEmpty"
import ShopProductItems from "./ShopProductItems"

type IProps = {
  idCategory:string
	nomenclatureProducts:IProduct[]
}

const ShopProducts: FC<IProps> = ({ idCategory,nomenclatureProducts }) => {
  const useCasePoints = adapterComponentUseCase(useCaseShop,{category:idCategory,products:nomenclatureProducts})
  const { category,products } = useCasePoints.data


  return (
    <div className="shop_grid">
      {

        products ? (
          products.length
                ? products.map((item: IProduct) => {
                  return <ShopProductItems key={item.id} products={item}/>
                })
                : category === 'favorite' ? <FavoriteEmpty /> : "Эта категория пуста :("

        ) : <LoaderProduct />
      }
    </div>
  )
}
export default ShopProducts