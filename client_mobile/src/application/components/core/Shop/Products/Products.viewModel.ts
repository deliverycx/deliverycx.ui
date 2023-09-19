import { IProduct } from "modules/ShopModule/interfaces/shop.type"
import { shopModel, shopUseCase } from "modules/ShopModule/shop.module"
import { useEffect, useState } from "react"


export function useProductsViewModel(products:IProduct[]) {
	const {selectCategory,selectProduct} = shopModel
  

  useEffect(() => {
    selectCategory?.id && shopUseCase.caseSelectProduct(products)
  }, [selectCategory?.id])


	
	console.log('produc',selectProduct);

  this.data({
    selectProduct
  })
  this.handlers({

  })
  this.status({
    
  })
}