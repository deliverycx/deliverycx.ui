import Slider from 'infinite-react-carousel';
import cn from 'classnames';
/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, memo, useMemo, useEffect, useRef } from 'react';

import { adapterComponentUseCase } from 'adapters/adapterComponents';

import { ICategory } from 'modules/ShopModule/interfaces/shop.type';
import { useCategoriesViewModel } from './Categories.viewModel';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

type IProps = {
  nomenclatureCategories: ICategory[];
  setCat: any;
};

const Categories: FC<IProps> = ({ nomenclatureCategories, setCat }) => {
  const useCasePoints = adapterComponentUseCase(useCategoriesViewModel, {
    categories: nomenclatureCategories,
    setCat,
  });
  const { categories, currentSlide, slider, slidecount } = useCasePoints.data;
  const { handleSliderClick } = useCasePoints.handlers;
  const { desc } = useCasePoints.status;

  //console.log(currentSlide);

  return (
    <Slider
      className="categories"
      initialSlide={currentSlide}
      afterChange={(index: number) => handleSliderClick(index, slider)}
      ref={slider}
      centerMode={desc ? false : true}
      slidesToShow={slidecount}
      arrows={false}
      centerPadding={0}
    >
      {categories &&
        categories.map((category: ICategory, i: number) => {
          const CN = cn('categories__item', { active: currentSlide === i });
          //console.log(currentSlide,i,category.name);
          if (category.description !== 'HIDDEN') {
            return (
              <div
                key={i}
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
                    <div className="categories__item__title">
                      {category.name}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </Slider>
  );
};
export default observer(Categories);
