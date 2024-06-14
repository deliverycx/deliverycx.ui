import { ROUTE_APP } from 'application/contstans/route.const';
import { isDesctomMediaQuery } from 'application/ResponseMedia';
import { cityModel } from 'modules/CityModule/city.module';
import { useNavigate } from 'react-router-dom';
import TopbarHeadMobile from 'shared/ui/components/topbar/TopbarHead.mobile';
import OrganizationsYMap from 'widgets/Organizations/OrganizationsOnMap/ui/OrganizationsYMap';

const OrganizationsPageMobile = () => {
	const navigate = useNavigate();
	const desc = isDesctomMediaQuery();
	const city = cityModel;

	const handleBackCity = () => {
		desc ? navigate(ROUTE_APP.CITY) : navigate(ROUTE_APP.MAIN);
	};

	return (
		<div className="map">
			<TopbarHeadMobile handlerNavigate={handleBackCity}>
				{city.selectCity && <>{city.selectCity.cityname}</>}
			</TopbarHeadMobile>
			<OrganizationsYMap />
		</div>
	);
};
export default OrganizationsPageMobile;
