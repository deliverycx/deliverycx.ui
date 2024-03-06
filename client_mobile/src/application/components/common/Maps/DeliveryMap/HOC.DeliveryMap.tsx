import { YMaps, Map, SearchControl, Placemark, YMapsApi, withYMaps, Polygon } from "react-yandex-maps";
import { TadapterCaseCallback, adapterComponentUseCase } from 'adapters/adapterComponents';
import { useDeliveryMapViewModel } from "./DeliveryMap.viewModel";
import { getGeoLocation } from "application/helpers/yandexapi";
import DeliveryYMaps from "./DeliveryYMaps";
import React from "react";
import { observer } from 'mobx-react-lite';
import DeliveryAdress from "./DeliveryAdress";
import { ROUTE_APP } from 'application/contstans/route.const';
import DeliveryAdressSelect from "./DeliveryAdressSelect";




export const DeliveryMapContext = React.createContext<TadapterCaseCallback>({
	data: {},
	handlers: {},
	status: {}
});
const HOCDeliveryMap = () => {
	const useCase = adapterComponentUseCase(useDeliveryMapViewModel)
	const { point, adress } = useCase.data
	const { navigate } = useCase.handlers

	//console.log(point.info.city);
	const [modalStreet, setModalStreet] = React.useState(false)

	
	return (
		<DeliveryMapContext.Provider value={useCase}>
			<div className="delivery_map">

				{
					point && !modalStreet &&
					<>
						<div className="map__topbar map__topbar__fixed">
							<div className="map__topbar-btn" onClick={() => navigate(-1)}>
								<img src={require("assets/images/icons/arrow_back.png")} alt="" />
							</div>
							<h3>{point.info.city}{adress && `, ${adress}`}</h3>
						</div>

						<DeliveryYMaps />
						<DeliveryAdress openModalAdress={true} setModalStreet={setModalStreet} />
						

					</>

				}
				{
					point && modalStreet &&
					<DeliveryAdressSelect setModalStreet={setModalStreet} />
				}


			</div>
		</DeliveryMapContext.Provider >
	)
}
export default observer(HOCDeliveryMap)  