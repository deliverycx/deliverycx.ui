/* eslint-disable @typescript-eslint/no-var-requires */
import { IProduct } from "@types";
import { adapterComponentUseCase } from "adapters/adapterComponents";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { useCaseSearchShop } from "domain/use-case/useCaseShop";
import { FC } from "react";
import ShopProductItem from "./ShopProductItems";
import ShopProduct from "./ShopProduct";

type IProps = {
    close:any
		nomenclatureProducts:IProduct[]
}

const ShopSearch:FC<IProps> = ({close,nomenclatureProducts}) => {
    const useCasePoints = adapterComponentUseCase(useCaseSearchShop,nomenclatureProducts);
    const { products } = useCasePoints.data;
    const { searchHandler } = useCasePoints.handlers;

    return (
        <div className="header__search-window">
            <div className="header__search-field">
                <div className="container">
                    <img
                        className="header__search-field__search"
                        src={require("assets/i/search.svg").default}
                    />
                    <input
                        type="text"
                        onChange={searchHandler}
                        placeholder="Искать"
                    />
                    <img
                        className="header__search-field__close"
                        onClick={()=> close(false)}
                        src={require("assets/i/close.svg").default}
                    />
                </div>
            </div>
            <div className="header__search-list">
                <div className="container">
                    <div className="product__list">
                        {
													products && products.length !==0 &&  products.map((item:IProduct) => <ShopProductItem key={item.productId} products={item}/>)
                   
                        }
											
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ShopSearch;
