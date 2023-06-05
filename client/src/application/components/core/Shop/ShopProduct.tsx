import { ICategory, IPoint, IProduct } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import { useCaseShop } from "domain/use-case/useCaseShop"
import FavoriteEmpty from "presentation/viewModel/viewShop/FavoriteEmpty"
import ShopProductItems from "application/components/core/Shop/ShopProductItems"
import { FC, useEffect} from "react"



type IProps = {
	nomenclatureProducts:IProduct[]
}

const ShopProduct:FC<IProps> = ({nomenclatureProducts}) => {
  const useCasePoints = adapterComponentUseCase(useCaseShop,nomenclatureProducts)
  const { category,products } = useCasePoints.data

  return (
      <div className="product__list">
            {

                  products.length
                        ? products.map((item: IProduct) => {
                          return  <ShopProductItems key={item.id} products={item}/>
                        })
                        : category === 'favorite' ? <FavoriteEmpty products={nomenclatureProducts} /> : "Эта категория пуста :("

              
            }
        </div>
  )
}
export default ShopProduct