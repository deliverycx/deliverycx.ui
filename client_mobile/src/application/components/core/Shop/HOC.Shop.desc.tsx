import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useShopViewModel } from "./Shop.viewModel"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import Categories from "./Categories/Categories"
import HOCProducts from "./Products/HOC.Products"
import StocksDesc from "./Stocks/Stocks.desc"
import { observer } from "mobx-react-lite"
import HOCBasketDesc from "../Basket/HOC.Basket.desc"

const HOCShopDesc = () => {
	const useCase = adapterComponentUseCase(useShopViewModel)
	const { organization, nomenclatures, selectCat } = useCase.data
	const { isLoading } = useCase.status
	const { setSelectCat } = useCase.handlers

	return (
		<>
			<div className="categories-desc">
					
				<div className="container">
					{
						organization ? <StocksDesc organization={organization.guid} /> : <StocksDesc organization={process.env.REACT_APP_DEFAULT_ORG as string} />
					}
					{
						!isLoading && nomenclatures ?
							nomenclatures.categoryes && <Categories nomenclatureCategories={nomenclatures.categoryes} setCat={setSelectCat} /> : <LoaderProduct />
					}
				</div>
			</div>


			<div className="catalogue-content">
				<div className="container">
					<div className="catalogue-content_container-desc">
						<div className="catalogue-content__cards">
							{
								!isLoading && nomenclatures ?
									nomenclatures.products && <HOCProducts nomenclatureProducts={nomenclatures.products} selectCat={selectCat} /> : <LoaderProduct />
							}
						</div>
						<div className="catalogue-content__basket">
							<HOCBasketDesc />
						</div>
						<div className="clear"></div>
					</div>
				</div>
			</div>

		</>
	)
}
export default observer(HOCShopDesc) 