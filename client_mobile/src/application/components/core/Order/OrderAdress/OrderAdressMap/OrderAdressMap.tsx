/* eslint-disable react/jsx-no-undef */
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useMemo } from "react";
import { YMaps, Map, SearchControl, Placemark, YMapsApi, withYMaps, Polygon } from "react-yandex-maps";

const placeMarkOption = {
	iconLayout: 'default#image',
	iconImageHref: '',
	iconImageSize: [50, 60],
	iconImageOffset: [-25, -60]
}
const OrderAdressMap = () => {

	return (
		<div className="address-select-map">
			<YMaps
				enterprise
				query={{ apikey: "473431c9-b8f6-45d6-a166-243a0152c68b" }}
			>

				<Map className="address-select-map map" modules={["geocode"]}
					defaultState={
						{
							center: [],
							zoom: 13,
							controls: [],
							scrollZoom: false
						}
					}
				>
					<Placemark
						options={placeMarkOption}
						geometry={[]}
					/>
					
				</Map>
			</YMaps>
		</div>
	)
}
export default OrderAdressMap