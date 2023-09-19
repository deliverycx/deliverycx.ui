import { observer } from "mobx-react-lite"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useShopViewModel } from "./Shop.viewModel";
import ShopHeader from "./view/ShopHeader";
import Stocks from "./Stocks/Stocks";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import Categories from "./Categories/Categories";
import HOCProducts from "./Products/HOC.Products";
import TabBar from "application/components/common/TabBar/TabBar";

const HOCShop = () => {
	const useCase = adapterComponentUseCase(useShopViewModel)
	const { organization, nomenclatures } = useCase.data
	const { isLoading } = useCase.status

	return (
		<>
		<div className="catalogue">
			<div className="catalogue-header">
				{
					organization && <ShopHeader organization={organization} />
				}
				{
					organization && <Stocks organization={organization} />
				}
				{
					!isLoading && nomenclatures ?
						nomenclatures.categoryes && <Categories nomenclatureCategories={nomenclatures.categoryes} /> : <LoaderProduct />
				}
			</div>
			<div className="catalogue-content">
				<div className="catalogue-content__cards">
					{
						!isLoading && nomenclatures ?
							nomenclatures.products && <HOCProducts nomenclatureProducts={nomenclatures.products} /> : <LoaderProduct />
					}
				</div>
			</div>
			

		</div>
		<TabBar />	
		</>
			
	)
}
export default observer(HOCShop)