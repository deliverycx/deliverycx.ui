import SlideBar from 'application/components/common/SlideBar/SlideBar'
import Categories from '../Сategories/Сategories'
import MainShopList from './HOC/HOC.MainShopList'
import ShopProductCard from './HOC_ProductCard/HOC.ShopProductCard'
import Link from 'next/link';
import { ROUTE_APP } from 'application/contstans/route.const';
import { checkPoint } from 'application/helpers/checkPoint';

const MainShopLayout = () => {
  return (
    <>
      <Categories pages='main' />
      <div className="space">
        <div className="container">
          <MainShopList />
          {
            checkPoint(false) &&
            <Link href={ROUTE_APP.MENU}><a href="" className='more_shop'>Показать ещё</a></Link>
          }
          <SlideBar />
        </div>
      </div>
      <ShopProductCard />

    </>
  )
}
export default MainShopLayout
