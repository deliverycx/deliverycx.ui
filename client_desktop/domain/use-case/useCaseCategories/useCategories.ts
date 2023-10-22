/* eslint-disable prefer-const */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "servises/redux/createStore";
import { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import { adapterSelector } from "servises/redux/selectors/selectors";
import { ICategory, IPoint } from "@types";

import { RTKCategories, useGetCategoriQuery } from "servises/repository/RTK/RTKCategories";
import { useRouter } from "next/router";
import { checkPoint } from "application/helpers/checkPoint";
import { RequestAdmin } from "../../../servises/repository/Axios/RequestAdmin";

export const staticCategories = {
    image: "./images/icon/favorite.png",
    id: "favorite",
    name: "Избранное",
}

export function useCategories(this: any,categories:ICategory[]) {
    const dispatch = useDispatch();
    const [catid,setCatId] = useState('')
    const router = useRouter()
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const {id,guid} = adapterSelector.useSelectors<IPoint>(selector => selector.point)
    const category = adapterSelector.useSelectors<ICategory>(selector => selector.category)
    const [hiddenProduct, setHiddenProduct] = useState()
    //const { data: categories, isFetching } = useGetCategoriQuery(catid)

    const handleSliderClick = useCallback((index: number,slider?:any) => {
        setCurrentSlide(index);
        //categories && dispatch(setCategories(categories[index]))
        localStorage.removeItem('prod')
    }, [categories])

    const hanleMainClick = (id:string) =>{
        checkPoint(false) ? router.push(`/menu?cat=${id}`)  : checkPoint(true)
    }

    const getHiddenProduct = async () => {
        try {
            const res = await RequestAdmin.getHiddenProducts({ organization: guid })
            setHiddenProduct(res.data)
        } catch (e) {
            console.log('error get or nothing hidden product');
        }
    }

    useEffect(() => {
        if(guid) {
            getHiddenProduct()
        }
    }, [id])

    useEffect(() => {
        id && setCatId(id)
    }, [id])



    this.data({
        router,
        categories,
        currentSlide,
        category,
        hiddenProductData: hiddenProduct
    })
    this.handlers({
        handleSliderClick,
        hanleMainClick
    })
    this.status({

    })
}