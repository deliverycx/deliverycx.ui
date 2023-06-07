import { ICategory, IProduct } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import { useCategories } from "domain/use-case/useCaseCategories"
import dynamic from "next/dynamic"
import { FC } from "react"
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const ShopProducts = dynamic(() => import('./view/ShopProducts'))

type IProps = {
	nomenclatureProducts:IProduct[]
	nomenclatureCategories:ICategory[]
}

const ShopList:FC<IProps> = ({nomenclatureCategories,nomenclatureProducts}) => {
  const useCasePoints = adapterComponentUseCase(useCategories,nomenclatureCategories)
  const {categories,currentSlide,category } = useCasePoints.data

  
  return (
    <>
      {
        categories ?
        categories.map((category: ICategory, i: number) => {
          if (category.name !== 'Избранное' && category.description !== 'HIDDEN') {
            return (
              <Element key={i} name={category.id}>
                <div className="title">{category.name}</div>
                <ShopProducts nomenclatureProducts={nomenclatureProducts} idCategory={category.id} />
              </Element>
            
            )
          }
          
        })  
        : <LoaderProduct />
      
      }
      
    </>
  )
}
export default ShopList