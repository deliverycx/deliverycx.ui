import { basketModel, basketUseCase } from "modules/BasketModule/basket.module"
import { IProduct } from "modules/ShopModule/interfaces/shop.type"
import { shopModel, shopUseCase } from "modules/ShopModule/shop.module"
import { useEffect, useState } from "react"


export function useProductsViewModel(products:IProduct[]) {
	const {selectCategory,selectProduct} = shopModel
	const {cart} = basketModel
  

  useEffect(() => {
    if(selectCategory && selectCategory.id){
			shopUseCase.caseSelectProduct(products)
			basketUseCase.cartCase()
		}
  }, [selectCategory])


	


  this.data({
    selectProduct
  })
  this.handlers({
		
  })
  this.status({
    
  })
}