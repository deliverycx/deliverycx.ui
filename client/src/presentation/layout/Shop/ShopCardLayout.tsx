import { ICategory } from "@types";
import ShopLinkToCart from "application/components/core/Shop/ShopLinkToCart";
import ShopProductCard from "application/components/core/Shop/ShopProductCard"
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack"
import { FC, useState } from "react"
import { RouteComponentProps } from "react-router";
import { adapterSelector } from "servises/redux/selectors/selectors";

interface IMatchProps {
  id: string
}
type RouteProps = RouteComponentProps<IMatchProps>;

const ShopCardLayout:FC<RouteProps> = ({ match }) => {
  const {productCard,category} = adapterSelector.useSelectors(selector => selector.shop)

  return (
    <div className="product-card">
            <HeaderBack backgroundColor="#fff">
                <div className="product-card__category">
                    <div className="category-image-wrap">
                        <img src={category.image} />
                    </div>
                </div>
            </HeaderBack>    
            <ShopProductCard product={productCard} />
            <ShopLinkToCart />
    </div>
  )
}
export default ShopCardLayout