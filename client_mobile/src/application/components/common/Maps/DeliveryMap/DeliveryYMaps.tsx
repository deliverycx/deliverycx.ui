import { memo, useContext } from "react";
import { YMaps, Map, SearchControl, Placemark, YMapsApi, withYMaps, Polygon } from "react-yandex-maps";
import { DeliveryMapContext } from "./HOC.DeliveryMap";

const placeMarkOption = {
	iconLayout: 'default#image',
	iconImageHref: require("assets/images/map_placemark.png"),
	iconImageSize: [50, 60],
	iconImageOffset: [-25, -60]
}
const DeliveryYMaps = () =>{
	const useCaseYMap = useContext(DeliveryMapContext)
	const { stateReduceMap, mapstate, zones } = useCaseYMap.data
	const {onMapClick} = useCaseYMap.handlers


	return(
		<div className="map__map">
				<YMaps>
					<div>
						<Map
							onClick={onMapClick}
							width="100"
							height="100vh"
							modules={["geocode"]}
							state={mapstate} defaultState={
								{
									center: [ 34.12574, 44.950961 ],
									zoom: 13,
									controls: [],
									scrollZoom: false
								}
							}

						>

<Placemark
            options={placeMarkOption}
            geometry={stateReduceMap.cord}
          />
						</Map>
					</div>
				</YMaps>
			</div>
	)
}
export default memo(DeliveryYMaps) 