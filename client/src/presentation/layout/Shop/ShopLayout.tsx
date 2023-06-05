import AdressInfo from "presentation/viewModel/viewHead/AdressInfo";
import HeaderShop from "presentation/viewModel/viewShop/HeaderShop";
import { animated, useTransition } from "react-spring"
import ShopSearch from "application/components/core/Shop/ShopSearch";
import Categories from "application/components/core/Сategories/Сategories";
import Stocks from "application/components/common/Stocks/Stocks";
import ShopProduct from "application/components/core/Shop/ShopProduct";
import ShopLinkToCart from "application/components/core/Shop/ShopLinkToCart";
import { useEffect, useState } from "react";
import OnspotModal from "application/components/common/Modals/OnspotModal";
import OnliPICKUPModal from "application/components/common/Modals/OnliPICKUPModal";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { useGetNomenclatureQuery } from "servises/repository/RTK/RTKShop";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";

const Shop = () => {
	const [isSearch, setSearch] = useState(false)
	const transitions = useTransition(isSearch, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	});

	const point = adapterSelector.useSelectors(selector => selector.point)
	const [id, setId] = useState(true)

	const { data: nomenclatures, isFetching } = useGetNomenclatureQuery(point.guid, {
		skip: id,
		refetchOnMountOrArgChange: true,
	})


	useEffect(() => {
		console.log(point.guid);
		point.guid && setId(false)
	}, [point])



	return transitions((style, item) => (
		<>
			{!item ?
				<animated.div className="shop__box" style={style}>
					<div className="container">
						<AdressInfo />
						<HeaderShop setSearch={setSearch} />

					</div>
					{
						!isFetching && nomenclatures ?
						nomenclatures.categoryes && <Categories nomenclatureCategories={nomenclatures.categoryes} /> : <LoaderProduct />
					}
					<Stocks />
					<div className="shop__box-items container">
						{
							!isFetching && nomenclatures ?
							nomenclatures.products && <ShopProduct nomenclatureProducts={nomenclatures.products} /> : <LoaderProduct />
						}
					</div>
					<ShopLinkToCart />
					<OnspotModal />
					<OnliPICKUPModal />
				</animated.div>
				:
				<animated.div style={style}>
					{
							!isFetching && nomenclatures ?
							nomenclatures.products && <ShopSearch close={setSearch} nomenclatureProducts={nomenclatures.products} /> : <LoaderProduct />
						}
					
				</animated.div>
			}
		</>

	));
}
export default Shop