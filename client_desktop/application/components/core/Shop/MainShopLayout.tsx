import SlideBar from 'application/components/common/SlideBar/SlideBar'
import Categories from '../Сategories/Сategories'
import MainShopList from './HOC/HOC.MainShopList'
import ShopProductCard from './HOC_ProductCard/HOC.ShopProductCard'
import Link from 'next/link';
import { ROUTE_APP } from 'application/contstans/route.const';
import { checkPoint } from 'application/helpers/checkPoint';
import { useState, useEffect } from 'react';
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { useGetNomenclatureQuery } from 'servises/repository/RTK/RTKShop';
import LoaderProduct from 'application/components/common/Loaders/loaderProduct';

const MainShopLayout = () => {
	const point = adapterSelector.useSelectors(selector => selector.point)
	const [id, setId] = useState<string>(process.env.NEXT_PUBLIC_DEFAULT_ORG as string)

	const { data: nomenclatures, isFetching } = useGetNomenclatureQuery(id, {
		refetchOnMountOrArgChange: true,
	})


	useEffect(() => {
		if (point.guid) {
			setId(point.guid)
		}

	}, [point])

	return (
		<>
			{
				!isFetching && nomenclatures ?
					nomenclatures.categoryes && <Categories pages='main' nomenclatureCategories={nomenclatures.categoryes} /> : <LoaderProduct />
			}
			<div className="space">
				<div className="container">
				{
				!isFetching && nomenclatures ?
					(nomenclatures.products && nomenclatures.categoryes) && <MainShopList nomenclatureCategories={nomenclatures.categoryes} nomenclatureProducts={nomenclatures.products} /> : <LoaderProduct />
			}

					{
						checkPoint(false) &&
						<Link href={ROUTE_APP.MENU}><a href="" className='more_shop'>Показать ещё</a></Link>
					}
					<SlideBar />
				</div>
			</div>
			{
				!isFetching && nomenclatures ?
					nomenclatures.products && <ShopProductCard nomenclatureProducts={nomenclatures.products} /> : <LoaderProduct />
			}

		</>
	)
}
export default MainShopLayout
