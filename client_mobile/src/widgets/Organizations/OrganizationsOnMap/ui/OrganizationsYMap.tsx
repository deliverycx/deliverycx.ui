import { isDesctomMediaQuery } from 'application/ResponseMedia';
import { useState } from 'react';
import { YMaps, Map, ZoomControl, GeolocationControl } from 'react-yandex-maps';
import OrganizationListOnMap from 'entities/Organizations/OrganizationsMap/ui/OrganizationListOnMap';
import { organizationsModel } from 'shared/module/organizations';
import OrganizationsPlacemarkMap from 'features/Organizations/OrganizationsPlacemarkMap/ui/OrganizationsPlacemarkMap';

const OrganizationsYMap = () => {
	const organizationList = organizationsModel.organizationList;
	const [cord, setCord] = useState([0.0, 0.0]);

	const desc = isDesctomMediaQuery();

	return (
		<YMaps>
			<div>
				<Map
					width="100"
					height={desc ? '760px' : '100vh'}
					defaultState={{
						center: cord,
						zoom: 13,
					}}
					state={{
						center: cord,
						zoom: 13,
					}}
				>
					<ZoomControl
						options={{
							position: { right: 10, bottom: desc ? 400 : 300 },
							zoomSize: 'small',
						}}
					/>
					<GeolocationControl
						options={{ position: { right: 10, bottom: desc ? 350 : 250 } }}
					/>
					<OrganizationListOnMap
						organizations={organizationList}
						action={(organization) => (
							<OrganizationsPlacemarkMap organization={organization} />
						)}
					/>
				</Map>
			</div>
		</YMaps>
	);
};
export default OrganizationsYMap;
