import Slider from "infinite-react-carousel";
import cn from "classnames";
/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, memo, useMemo,useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { adapterComponentUseCase } from "adapters/adapterComponents";


import { ICategory } from "modules/ShopModule/interfaces/shop.type";
import { useCategoriesViewModel } from "./Categories.viewModel";
import { useState } from 'react';
import { observer } from "mobx-react-lite";


type IProps = {
	nomenclatureCategories: ICategory[]
	setCat:any
}

const Categories: FC<IProps> = ({ nomenclatureCategories,setCat }) => {
	
	const [slidecount,setSlideCount] = useState(7)

	const useCasePoints = adapterComponentUseCase(useCategoriesViewModel,{categories:nomenclatureCategories,setCat} )
	const { categories, currentSlide, slider } = useCasePoints.data
	const { handleSliderClick } = useCasePoints.handlers

	setCat(123)

	const handleWindowResize = useMemo(() => debounce(() => {
    if (window.innerWidth < 600) {
      setSlideCount(5)
    }else{
			setSlideCount(7)
		}
  }, 100), [])

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [])


	return (
		<Slider
			className="categories"
			initialSlide={currentSlide}
			afterChange={(index: number) => handleSliderClick(index, slider)}
			ref={slider}
			centerMode
			slidesToShow={slidecount}
			arrows={false}
			centerPadding={0}

		>
			{
				categories && categories.map((category: ICategory, i: number) => {
					const CN = cn("categories__item", { active: currentSlide === i });
					if (category.description !== 'HIDDEN') {
						return (
							<div key={i}
								className={CN}
								onClick={() => handleSliderClick(i, slider)}
							>
								<div className="categories__item__content-wrapper">
									<div className="categories__item__content-wrapper-box">
									<div className="categories__item__img-wrap">
										<div>
											<img src={category.image} alt={category.name} />
										</div>
									</div>
									<div className="categories__item__title">{category.name}</div>
									</div>
								</div>
							</div>
						);
					}

				})
			}
		</Slider>
	)
}
export default observer(Categories) 