import { IPoint, TStopListItems } from "@types"
import { adapterSelector } from "servises/redux/selectors/selectors"
import { useGetProductsQuery, useSearchProductsMutation } from "servises/repository/RTK/RTKShop"
import { ChangeEvent, useRef, useState } from 'react';
import { useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useHistory } from "react-router-dom";
import { Redirects } from "application/helpers/redirectTo";
import { useDispatch } from "react-redux";
import { fetStopList } from "servises/redux/slice/shopSlice";
import { useRedirectOrg } from "application/hooks/useRedirectOrgTable";

export function useCaseShop() {
  const [id,setId] = useState(true)
  const category = adapterSelector.useSelectors(selector => selector.category)
	const dispatch = useDispatch()
	const point = adapterSelector.useSelectors(selector => selector.point)
  const { data: products, isFetching } = useGetProductsQuery(category?.id, {
    skip:id,
    refetchOnMountOrArgChange:true,
  })

	useRedirectOrg()

  useEffect(() => {
    category?.id && setId(false)
		//Redirects(point.guid)
  }, [category?.id])


	useEffect(() => {
    !id && dispatch(fetStopList(point.guid))  
  }, [id])


  this.data({
    category: category?.id,
    products
  })
  this.handlers({

  })
  this.status({
    isFetching
  })
}

export function useCaseShopItem({id,productId}:any) {
  const stoplists = adapterSelector.useSelectors(selector => selector.stoplist)
  const history = useHistory();
  const cardRef = useRef<HTMLDivElement>(null);
  const [disableItem, setDisableItem] = useState(false)

	

  const clickItemHandler = (e: any, id: string) => {
      if(disableItem) return

      if ((e.target as HTMLButtonElement).type !== 'submit') {
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
				
        item.productId === productId && setDisableItem(true)
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


export function useCaseSearchShop() {
  const organization = adapterSelector.createSelectors<IPoint>(selector => selector.point, val => val.id)
  const [search, { data: products, isUninitialized, isSuccess }] = useSearchProductsMutation()

  const searchHandler = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    value && search({
      searchString: value,
      organizationId:organization
    })
  },500)


  this.data({
    organization,
    products
  })
  this.handlers({
    searchHandler
  })
  this.status({
    isSuccess,
    isUninitialized
  })
}
