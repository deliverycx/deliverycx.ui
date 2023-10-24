import { basketModel, basketUseCase } from "modules/BasketModule/basket.module"
import { ICategory, IProduct } from "modules/ShopModule/interfaces/shop.type"
import { shopModel, shopUseCase } from "modules/ShopModule/shop.module"
import { useEffect, useState } from "react"


export function useProductsViewModel({products,selectCat}:{products:IProduct[],selectCat:ICategory}) {
	const [selectProduct,setSelectProduct] = useState<IProduct[] | null>()
	const {stopList} = shopModel
  

  useEffect(() => {
    if(selectCat && selectCat.id){
			const product = shopUseCase.caseSelectProduct(products,selectCat.id)
			product && setSelectProduct(product)
		}
  }, [selectCat])


	


  this.data({
    selectProduct,
		stopList
  })
  this.handlers({
		
  })
  this.status({
    
  })
}