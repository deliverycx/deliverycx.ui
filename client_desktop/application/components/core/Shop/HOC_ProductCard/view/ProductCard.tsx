import { IProduct } from "@types"
import convertWeight from "application/helpers/convertWeight"
import { imgRout } from "application/helpers/imgInit"
import { FC } from "react"
import AddToCart from "../../Presentation/AddToCart"

type IProps = {
  product:IProduct
  onClose:any
}

const ProductCard:FC<IProps> = ({product,onClose}) => {
  return (
    <>
    {
      product && (
      <div className="product_card">
    		<div className="product_card-container">
    			<div className="close" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_329_8395)">
                <path d="M0 0L11.9991 12M12 0L0.00090279 12" stroke="#ABABAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_329_8395">
                  <rect width="12" height="12" fill="white"/>
                </clipPath>
              </defs>
            </svg>
    			</div>
    			<div className="product_card__item__img-wrap">
    				<div>
    					<img src={imgRout(product.image)} alt=""/>
    				</div>
    			</div>

    			<div className="product_card__item__content">
            <section>
      				<div className="product_card__item-title">{product.name}</div>
      				<div className="product_card__item-text">
      					{product.description}
      				</div>
            </section>
    				{
              /**
               * <div className="product_card__sous">
    					<div className="product_card__sous-title">
    						<span>Соус к хинкали</span>
    					</div>
    					<div className="product_card__sous_list">
    						<div className="product_card__sous_list-item">
    							<div className="sous_list-item--name">wwww</div>
    							<div className="sous_list-item--grams">25</div>
    							<div className="sous_list-item--price">35</div>
    							<div className="sous_list-item--radio">
    								<input className="custom-radio" name="color" type="radio" id="color-green" value="green"/>
    								<label htmlFor="color-green"></label>
    							</div>
    						</div>
    						<div className="product_card__sous_list-item">
    							<div className="sous_list-item--name">wwwwwwwwwwww</div>
    							<div className="sous_list-item--grams">25</div>
    							<div className="sous_list-item--price">35</div>
    							<div className="sous_list-item--radio">
    								<input className="custom-radio" name="color" type="radio" id="color-green2" value="green"/>
    								<label htmlFor="color-green2"></label>
    							</div>
    						</div>
    					</div>
    				</div>
               *
               */
            }
    				<div className="product_card__option">
    					<div>
    						<div className="measure">
                {
                  product.measureUnit === "порц"
									 ? `${convertWeight(product.weight)} г`:
									 product.measureUnit === "мл"  ? product.weight + 'мл' 
									 
									 : "1 шт"
                }
                </div>
    						<div className="price">{product.price} ₽</div>
    					</div>
                  {
                    false &&
                    <div className="product_card__count-option">
      						<div className="count-option__remove"><img src="/images/icon/minus.svg" alt="минус"/></div>
      						<div className="count-option__count">1</div>
      						<div className="count-option__increment"><img src="/images/icon/plus.svg" alt="плюс"/></div>
      					</div>
              }
              <AddToCart id={product.id} groupImage={product.categoryImage} _class={"product-card__add"}/>
    				</div>
    			</div>
    		</div>
    	</div>
      )
    }
    </>
  )
}
export default ProductCard
