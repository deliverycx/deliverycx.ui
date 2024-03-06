/* eslint-disable react-hooks/rules-of-hooks */
import { adapterSelector } from "servises/redux/selectors/selectors"
import { useEffect, useState, useCallback } from 'react';
import { useGetProductCartQuery } from "servises/repository/RTK/RTKShop";
import { setProductItem } from "servises/redux/slice/shopSlice";
import { useDispatch } from "react-redux";
import { IProduct } from '@types';

export function useCaseShopCard(this: any, category: string) {
  const dispatch = useDispatch()
  const [modal,setModal] = useState(true)
	const [product,setProduct] = useState<IProduct | null>(null)
  const { productid } = adapterSelector.useSelectors(selector => selector.shop)
	/*
  const { data:product, isFetching } = useGetProductCartQuery(productid,{
    skip:id,
    refetchOnMountOrArgChange:true,
  })
	*/
  
  useEffect(() => {
    productid && setProduct(productid)  
  }, [productid])
  
  const handlerClose = () => {
    dispatch(setProductItem(null))
    setProduct(null) 
  }


  this.data({
    product,
    productid
  })
  this.handlers({
    handlerClose
  })
  this.status({

  })
}