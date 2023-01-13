import { IGeoCodeResponse } from "@types";
import { ROUTE_APP } from "application/contstans/route.const";
import {
    geoCodeValidAdress,
    getGeoLocation
} from "application/helpers/yandexapi";
import {
    CartMapReducer,
    initialStateCartMap,
    ReducerActionTypePoints
} from "application/reducers/CartMapReducer";
import axios from "axios";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useDispatch } from "react-redux";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { setAdress } from "servises/redux/slice/cartSlice";
import { useGetDeliveryZonesQuery } from "servises/repository/RTK/RTKCart";
import { useGetStreetCityQuery } from "servises/repository/RTK/RTKLocation";

export function useCartMap(this: any,close:any) {
    const dispatch = useDispatch();
    const pointCords = adapterSelector.createSelectors(
        (selector) => selector.point,
        (val) => val.cords
    );
    const { address } = adapterSelector.useSelectors(
        (selector) => selector.cart
    );
    const { city,guid } = adapterSelector.useSelectors((selector) => selector.point);
    const [stateReduceMap, dispatchMap] = useReducer(
        CartMapReducer,
        initialStateCartMap
    );

		const point = adapterSelector.useSelectors(selector => selector.point)
		const {data:ikkostreet,isLoading:isLoadingStreet} = useGetStreetCityQuery({
			organizationId:point.guid,
		})

    useEffect(() => getGeoLoc(), [pointCords]);
    useEffect(() => {
        if (address) {
            dispatchMap({
                type: ReducerActionTypePoints.setValueMap,
                payload: address
            });
        }
    }, [address]);

		const {data:zones,isLoading:isLoadingZone } = useGetDeliveryZonesQuery(guid)

    const mapstate = useMemo(() => {
        return { center: stateReduceMap.stateMap, zoom: 17 };
    }, [stateReduceMap.stateMap]);
    /**
     * @description получение кординат текущего местоположения, в случае не удачи кординаты точки
     */
    const getGeoLoc = useCallback(() => {
        getGeoLocation()
            .then((res: any) => {
                dispatchMap({
                    type: ReducerActionTypePoints.getGeoLoc,
                    payload: [...res]
                });
            })
            .catch((e: unknown) => {
                dispatchMap({
                    type: ReducerActionTypePoints.getGeoLoc,
                    payload: [pointCords[0], pointCords[1]]
                });
            });
    }, [pointCords]);
    /**
     * @description получение кординат при клике по карте
     */
    const onMapClick = (e: any) => {
        const cords = e.get("coords");

        dispatchMap({
            type: ReducerActionTypePoints.onMapClick,
            payload: {
                cord: cords
            }
        });
        axios
            .get<IGeoCodeResponse>(
                `https://geocode-maps.yandex.ru/1.x/?geocode=${cords.reverse()}&format=json&apikey=164ee8b6-9e22-4e21-84ed-a0778bdf0f37`
            )
            .then(({ data }) => {
                geoCodeValidAdress(
                    city,
                    data.response.GeoObjectCollection.featureMember[0].GeoObject
                        .name,
                    (valid: boolean) => {
                        dispatchMap({
                            type: ReducerActionTypePoints.setDisclaimer,
                            payload: valid
                        });
                    }
                );
                dispatchMap({
                    type: ReducerActionTypePoints.onMapClick,
                    payload: {
                        value: data.response.GeoObjectCollection
                            .featureMember[0].GeoObject.name
                    }
                });
            });
    };
    /**
     * @description кейсы:
     * @method setStateMap - в водимая область
     * @method setExactCord - точные кординаты, точки
     * @method setDisclaimer - предупреждение
     * @method setValueMap - в введенное в поиске
     */
    const onMapTyping = () => {
        return {
            setStateMap: (cord: number[]) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setStateMap,
                    payload: cord
                }),
            setExactCord: (cord: number[]) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setExactCord,
                    payload: cord
                }),
            setDisclaimer: (disc: boolean) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setDisclaimer,
                    payload: disc
                }),
            setValueMap: (val: string) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setValueMap,
                    payload: val
                }),
            setInputMap: (val: boolean) =>
                dispatchMap({
                    type: ReducerActionTypePoints.setInputMap,
                    payload: val
                })
        };
    };
    /**
     * @description конпка "заказать доставку"
     */
    const hendleMapPopup = () => {
        if (
            (stateReduceMap.valueMap || address) &&
            !stateReduceMap.disclaimer
        ) {

					const street = stateReduceMap.valueMap.split(",")[0]
					

					if(!isLoadingStreet && ikkostreet){
						const findstreet = ikkostreet.some(element => element.name === street && !element.isDeleted);
						if(findstreet){
							dispatch(setAdress(stateReduceMap.valueMap));
	            onMapTyping().setValueMap("");
	            close()
						}else{
							dispatchMap({
								type: ReducerActionTypePoints.setDisclaimer,
								payload: true
							})
						}
					}

            
        }
    };

		/**
     * @description конпка "заказать доставку"
     */
		 const hendleZone = (zone:boolean) => {
			dispatchMap({
				type: ReducerActionTypePoints.hendleZone,
				payload: !zone 
			})
		};

    this.data({
        stateReduceMap,
        mapstate,
				zones
    });
    this.handlers({
        onMapTyping,
        getGeoLoc,
        onMapClick,
        hendleMapPopup,
				hendleZone
    });
		this.status({
			isLoadingZone,
			isLoadingStreet
		})
}
