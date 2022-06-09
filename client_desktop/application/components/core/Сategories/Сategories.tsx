import Slider from "infinite-react-carousel";
import cn from "classnames";
import { useEffect, useRef } from 'react';
import { ICategory } from "@types";
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCategories } from "domain/use-case/useCaseCategories";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import LinkNext from 'next/link'
import { imgRout } from "application/helpers/imgInit";
import CartSmall from "../Cart/HOC_CartSmall/HOC.CartSmall";
import LogoMini from "../Shop/Presentation/LogoMini";
import { ROUTE_APP } from "../../../contstans/route.const";

const Categories = () => {
  const slider = useRef<typeof Slider>(null);

  const useCasePoints = adapterComponentUseCase(useCategories)
  const { categories, currentSlide, category } = useCasePoints.data
  const { handleSliderClick } = useCasePoints.handlers
  const { isFetching } = useCasePoints.status

  useEffect(() => {
    scrollSpy.update()
  }, [])

  return (
    <div className="categories">
      <div className="container">
        <div className="categories_flex">
          <LogoMini />
          {
            (!isFetching && categories) &&
            categories.map((category: ICategory, i: number) => {
              if (category.name !== "Избранное") {
                const CN = cn("categories__item", { active: currentSlide === i });
                return (
                  // <LinkNext href={`${ROUTE_APP.MENU}?cat=${category.id}`}>
                  <Link
                    key={i}
                    className={CN}
                    to={category.id} smooth={true} offset={-160}
                    onClick={() => handleSliderClick(i, slider)}
                  >
                      <div className="categories__item__content-wrapper">
                        <div className="categories__item__img-wrap">
                          <div>
                            <img src={imgRout(category.image)} alt={category.name} />
                          </div>
                        </div>
                        <div className="categories__item__title">{category.name}</div>
                      </div>
                  </Link>
                  // </LinkNext>
                );
              }
            })
          }
          <div className="categories__item__cart">
            <CartSmall />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Categories
