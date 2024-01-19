import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useShopViewModel } from "./Shop.viewModel"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import Categories from "./Categories/Categories"
import HOCProducts from "./Products/HOC.Products"

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
						!isLoading && nomenclatures ?
							nomenclatures.categoryes && <Categories nomenclatureCategories={nomenclatures.categoryes} setCat={setSelectCat} /> : <LoaderProduct />
					}
				</div>
			</div>


			<div className="catalogue-content">
				<div className="container">
					<div className="catalogue-content__cards">
						{
							!isLoading && nomenclatures ?
								nomenclatures.products && <HOCProducts nomenclatureProducts={nomenclatures.products} selectCat={selectCat} /> : <LoaderProduct />
						}
					</div>
				</div>
			</div>

		</>
	)
}
export default HOCShopDesc