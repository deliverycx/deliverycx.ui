import SlideBar from 'application/components/common/SlideBar/SlideBar'
import Categories from '../Сategories/Сategories'
import ShopList from './HOC/HOC.ShopList'
import ShopProductCard from './HOC_ProductCard/HOC.ShopProductCard'
import { useState, useEffect } from 'react'
import { adapterSelector } from 'servises/redux/selectors/selectors'
import { useGetNomenclatureQuery } from 'servises/repository/RTK/RTKShop'
import LoaderProduct from 'application/components/common/Loaders/loaderProduct'
const ShopLayout = () => {
	const point = adapterSelector.useSelectors(selector => selector.point)
	const [id, setId] = useState<boolean>(true)

	const { data: nomenclatures, isFetching } = useGetNomenclatureQuery(point.guid, {
		skip:id,
		refetchOnMountOrArgChange: true,
	})


	useEffect(() => {
		if (point.guid) {
			setId(false)
		}
	}, [point])
	
  return (
    <>
      {
				!isFetching && nomenclatures ?
					nomenclatures.categoryes && <Categories nomenclatureCategories={nomenclatures.categoryes} /> : <LoaderProduct />
			}
      <div className="space">
        
        <div className="container">
				{
				!isFetching && nomenclatures ?
					(nomenclatures.products && nomenclatures.categoryes) && <ShopList nomenclatureCategories={nomenclatures.categoryes} nomenclatureProducts={nomenclatures.products} /> : <LoaderProduct />
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
export default ShopLayout