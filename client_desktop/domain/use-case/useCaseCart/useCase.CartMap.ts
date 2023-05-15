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
import { setAdress, setKladrId } from "servises/redux/slice/cartSlice";
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
    const { city,guid,address:pointadress } = adapterSelector.useSelectors((selector) => selector.point);
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
                `https://geocode-maps.yandex.ru/1.x/?geocode=${cords.reverse()}&format=json&apikey=473431c9-b8f6-45d6-a166-243a0152c68b`
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
    const hendleMapPopup = async () => {
        if (
            (stateReduceMap.valueMap || address) &&
            !stateReduceMap.disclaimer
        ) {
					/*
					const street = stateReduceMap.valueMap.split(",")[0]
					

					if(!isLoadingStreet && ikkostreet){
						const findstreet = ikkostreet.some(element => element.name === street);
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
					*/



					const kladrid = await daData(`${city}, ${stateReduceMap.valueMap}` )
					console.log(kladrid);
					if(!isLoadingStreet && ikkostreet){
						const findstreet = ikkostreet.some(element => element.classifierId === kladrid && !element.isDeleted);
						
						if(findstreet){
							dispatch(setKladrId(kladrid)) 
						}else{
							const pointKladrId = await daData(`${city}, ${pointadress}` )
							dispatch(setKladrId(pointKladrId)) 
						}
						dispatch(setAdress(stateReduceMap.valueMap));
						onMapTyping().setValueMap("");
						close()
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

		const daData = async (queryStreet:string) =>{
			try {
				const remote_url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
				const body = {
						'query' : queryStreet,
						'count' : 1
				};
				const token = '4d575df5b58e315429934796a55711d488a8fdec';
				const secret = "1894ee2d296d0ebc7b52704972a965c5dc54a860";
				const config = {
						headers: {'Authorization': 'Token ' + token}
						
				};
				
				const {data} = await axios.post(remote_url, body, config)
				return data.suggestions[0].data.street_kladr_id
			} catch (error) {
				console.log('ошибка в кладр');
				//daData('Симферополь Турецкая 25')
			}
	}

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
