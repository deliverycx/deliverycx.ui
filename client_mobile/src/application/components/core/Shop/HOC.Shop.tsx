import { observer } from 'mobx-react-lite';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useShopViewModel } from './Shop.viewModel';
import ShopHeader from './view/ShopHeader';
import Stocks from './Stocks/Stocks';
import LoaderProduct from 'application/components/common/Loaders/loaderProduct';
import Categories from './Categories/Categories';
import HOCProducts from './Products/HOC.Products';
import TabBar from 'application/components/common/TabBar/TabBar';
import { userUseCase } from 'modules/UserModule/user.module';
import OrderAuthNotificate from '../Order/view/OrderAuthNotificate';
import { ROUTE_APP } from 'application/contstans/route.const';

const HOCShop = () => {
	const useCase = adapterComponentUseCase(useShopViewModel);
	const { organization, nomenclatures, selectCat } = useCase.data;
	const { isLoading } = useCase.status;
	const { setSelectCat } = useCase.handlers;

	return (
		<>
			<div className="link_mobileapp_box">
				<section>
					<img width="40" height="40" src={require('assets/images/icons/loading.png')} alt="" />
					<p>В приложении ещё удобнее</p>
				</section>
				<a href={ROUTE_APP.DOWNLOAD} className='link_mobileapp-link'>Открыть</a>
			</div>
			<div className="catalogue">
				<div className="catalogue-header">
					{organization && <ShopHeader organization={organization} />}
					{organization && <Stocks organization={organization} />}
				</div>
				{!isLoading && nomenclatures ? (
					nomenclatures.categoryes && (
						<Categories
							nomenclatureCategories={nomenclatures.categoryes}
							setCat={setSelectCat}
						/>
					)
				) : (
					<LoaderProduct />
				)}
				<div className="catalogue-content">
					<div className="catalogue-content__cards">
						{!isLoading && nomenclatures ? (
							nomenclatures.products && (
								<HOCProducts
									nomenclatureProducts={nomenclatures.products}
									selectCat={selectCat}
								/>
							)
						) : (
							<LoaderProduct />
						)}
					</div>
				</div>

				{
					//!userUseCase.checkAuthUser() && <OrderAuthNotificate openmodal={true} />
				}
			</div>
			<TabBar />
		</>
	);
};
export default observer(HOCShop);
