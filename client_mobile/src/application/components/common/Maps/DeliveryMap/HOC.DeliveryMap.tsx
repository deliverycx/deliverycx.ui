import { YMaps, Map, SearchControl, Placemark, YMapsApi, withYMaps, Polygon } from "react-yandex-maps";
import { TadapterCaseCallback, adapterComponentUseCase } from 'adapters/adapterComponents';
import { useDeliveryMapViewModel } from "./DeliveryMap.viewModel";
import { getGeoLocation } from "application/helpers/yandexapi";
import DeliveryYMaps from "./DeliveryYMaps";
import React from "react";
import { observer } from 'mobx-react-lite';
import DeliveryAdress from "./DeliveryAdress";
import { ROUTE_APP } from 'application/contstans/route.const';




export const DeliveryMapContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const HOCDeliveryMap = () => {
	const useCase = adapterComponentUseCase(useDeliveryMapViewModel)
	const { point,adress } = useCase.data
	const {navigate} = useCase.handlers

	//console.log(point.info.city);

	return (
		<div className="map">
			{
				point &&
				<>
				<div className="map__topbar">
				<div className="map__topbar-btn" onClick={()=> navigate(-1)}>
					<img src={require("assets/images/icons/arrow_back.png")} alt="" />
				</div>
				<h3>{point.info.city}{adress && `, ${adress}`}</h3>
			</div>
				<DeliveryMapContext.Provider value={useCase}>
					<DeliveryYMaps />
					<DeliveryAdress openModalAdress={true}/>
				</DeliveryMapContext.Provider>
				</>

			}

			
		</div>

	)
}
export default observer(HOCDeliveryMap)  