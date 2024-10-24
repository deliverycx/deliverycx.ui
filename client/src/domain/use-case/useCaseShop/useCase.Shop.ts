import { IPoint, IProduct, TStopListItems } from "@types"
import { adapterSelector } from "servises/redux/selectors/selectors"
import { useGetFavoritesQuery, useGetProductsQuery, useSearchProductsMutation } from "servises/repository/RTK/RTKShop"
import { ChangeEvent, useRef, useState } from 'react';
import { useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useHistory } from "react-router-dom";
import { Redirects } from "application/helpers/redirectTo";
import { useDispatch } from "react-redux";
import { fetStopList, setProductCard } from "servises/redux/slice/shopSlice";
import { useRedirectOrg } from "application/hooks/useRedirectOrgTable";
import { delivertyTime } from "application/helpers/workTime";

export function useCaseShop(products:IProduct[]) {
  const [id,setId] = useState(true)
  const category = adapterSelector.useSelectors(selector => selector.category)
	const dispatch = useDispatch()
	const point = adapterSelector.useSelectors(selector => selector.point)
	/*
  const { data: products, isFetching } = useGetProductsQuery(category?.id, {
    skip:id,
    refetchOnMountOrArgChange:true,
  })
	*/


	

	products = products.filter((product:IProduct) =>{
		//product.isFav = true
		return product.category === category.id
	})


	

  useEffect(() => {
    category?.id && setId(false)
		//Redirects(point.guid)
  }, [category?.id])


	useEffect(() => {
		if(!id){
			dispatch(fetStopList(point.guid))
			const q = delivertyTime()
			console.log(q);
			
		}
		
  }, [id])


  this.data({
    category: category?.id,
    products
  })
  this.handlers({

  })
  this.status({
    
  })
}

export function useCaseShopItem(prodid:string) {
  const stoplists = adapterSelector.useSelectors(selector => selector.stoplist)
  const history = useHistory();
	const dispatch = useDispatch()
  const cardRef = useRef<HTMLDivElement>(null);
  const [disableItem, setDisableItem] = useState(false)

	

  const clickItemHandler = (e: any, id: string,products:IProduct) => {
      if(disableItem) return

      if ((e.target as HTMLButtonElement).type !== 'submit') {
					dispatch(setProductCard(products))
          history.push(`/shop/product/${id}`)

          localStorage.setItem("prod", cardRef.current?.dataset.id as string)
      }
  }

  useEffect(() => {
      const id = localStorage.getItem('prod')
      new Promise((resolve, reject) => {
          if (cardRef.current?.dataset.id == id) {
              resolve(cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
          }
      })
          //.then(() => localStorage.removeItem('prod'))
          //.catch(() => localStorage.removeItem('prod'))

  }, [])
	

  useEffect(() => {
    if (stoplists) {
			stoplists.forEach((item: TStopListItems) => {
        item.productId === prodid && setDisableItem(true)
      })
    }

  },[stoplists])




  this.data({
    cardRef,
    disableItem
  })
  this.handlers({
    clickItemHandler
  })
  this.status({

  })
}


export function useCaseSearchShop(nomenclatureProducts:IProduct[]) {
  const organization = adapterSelector.createSelectors<IPoint>(selector => selector.point, val => val.id)
	const [products,setProducts] = useState<IProduct[] |null>(null)
  //const [search, { data: products, isUninitialized, isSuccess }] = useSearchProductsMutation()

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
		
		if(!value){
			setProducts(null)
		}

		const table:any = {};
		const findProducts = nomenclatureProducts.filter(element => {
			if(!table[element.id] && (table[element.id] = 1)){
				return element.name.toUpperCase().indexOf(value.toUpperCase()) > -1
			}
		})
		setProducts(findProducts)

  }

	
	

  this.data({
    organization,
    products
  })
  this.handlers({
    searchHandler
  })
  this.status({

  })
}
