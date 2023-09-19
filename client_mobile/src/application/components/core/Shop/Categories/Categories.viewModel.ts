/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ICategory } from "modules/ShopModule/interfaces/shop.type";
import { shopModel } from "modules/ShopModule/shop.module";
import Slider from 'react-slick';





export function useCategoriesViewModel(categories: ICategory[]) {
	const slider = useRef<any>(null);
	const [currentSlide, setCurrentSlide] = useState<number>(0)
	const category = shopModel.selectCategory



	//const { data: categories, isFetching } = useGetCategoriQuery(id)

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
			//categories && dispatch(setCategories(categories[catIndex]))
			time = setTimeout(() => {

				setCurrentSlide(catIndex);
			}, 100)
		}


		return () => {
			typeof time === 'number' && clearTimeout(time)
		}
	}, [categories])



	this.data({
		categories,
		currentSlide,
		category,
		slider
	})
	this.handlers({
		handleSliderClick
	})
	this.status({

	})
}