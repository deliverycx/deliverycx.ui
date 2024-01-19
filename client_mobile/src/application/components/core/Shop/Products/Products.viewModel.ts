import { isDesctomMediaQuery } from "application/ResponseMedia"
import { basketModel, basketUseCase } from "modules/BasketModule/basket.module"
import { ICategory, IProduct } from "modules/ShopModule/interfaces/shop.type"
import { shopModel, shopUseCase } from "modules/ShopModule/shop.module"
import { useEffect, useState } from "react"


export function useProductsViewModel({products,selectCat}:{products:IProduct[],selectCat:ICategory}) {
	//const [selectProduct,setSelectProduct] = useState<IProduct[] | null>()
	const {stopList,selectProduct,selectCategory} = shopModel
  const descQuery = isDesctomMediaQuery()

  useEffect(() => {
		
    if(selectCategory){
			const product = shopUseCase.caseSelectProduct(products,selectCategory.id, descQuery ? process.env.REACT_APP_MEDIAQUERY_DESC : null)
			//console.log(product);
			//product && setSelectProduct(product)
		}
  }, [selectCategory])


	


  this.data({
    selectProduct,
		stopList,
		selectCategory
  })
  this.handlers({
		
  })
  this.status({
    
  })
}