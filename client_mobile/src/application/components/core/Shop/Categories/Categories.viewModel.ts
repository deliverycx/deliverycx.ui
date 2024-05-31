/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ICategory } from "modules/ShopModule/interfaces/shop.type";
import { shopModel } from "modules/ShopModule/shop.module";
import Slider from 'react-slick';
import debounce from 'lodash.debounce';
import { isDesctomMediaQuery } from 'application/ResponseMedia';




export function useCategoriesViewModel({categories,setCat}:{categories: ICategory[],setCat:any}) {
	const slider = useRef<any>(null);
	const [currentSlide, setCurrentSlide] = useState<number>(0)
	const category = shopModel.selectCategory
	const [slidecount,setSlideCount] = useState(7)
	const desc = isDesctomMediaQuery()

	//console.log('categories',categories);


	const handleSliderClick = useCallback((index: number, slider?: any) => {
		slider.current?.slickGoTo(index);
		setCurrentSlide(index);
		categories && shopModel.actionSelectCategory(categories[index])
		localStorage.removeItem('prod')
	}, [categories])


	useEffect(() => {
		let time: null | ReturnType<typeof setTimeout> = null
		if (category && slider.current) {
			const catIndex = categories.findIndex((cat) => cat.id === category.id)

			if(catIndex === -1){
				setCat(categories[0])
				shopModel.actionSelectCategory(categories[0])
			}else{
				setCat(categories[catIndex])
			}
			

			
		
			time = setTimeout(() => {

				setCurrentSlide(catIndex);
			}, 100)
		}else{
			time = setTimeout(() => {
				shopModel.actionSelectCategory(categories[0])
				setCurrentSlide(0);
			}, 100)
		}


		return () => {
			typeof time === 'number' && clearTimeout(time)
		}
	}, [categories,category])


	const handleWindowResize = useMemo(() => debounce(() => {
    if (window.innerWidth < 600) {
      setSlideCount(5)
    }else if(window.innerWidth < 780){
			setSlideCount(7)
		}else{
			setSlideCount(9)
		}
  }, 100), [])

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [])

	this.data({
		slidecount,
		categories,
		currentSlide,
		category,
		slider
	})
	this.handlers({
		handleSliderClick
	})
	this.status({
		desc
	})
}