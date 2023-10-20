/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { shemaAdress } from "application/helpers/validationSchema";
import { geoCodeValidAdress, getGeoLocation } from "application/helpers/yandexapi";
import { CartMapReducer, ReducerActionTypePoints, initialStateCartMap } from "application/reducers/CartMapReducer";
import axios from "axios";
import { useFormik } from "formik";
import { organizationModel } from "modules/OrganizationModule/organization.module";
import { useReducer, useMemo, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RequestWebhook from "servises/Request/Request.Webhook";
import { IIkkoStreet } from "./DeliveryAdressSelect";
import { profileModel, profileUseCase } from "modules/Profile/profile.module";
import { orderModel } from "modules/OrderModule/order.module";
import { IAddressDelivery } from "modules/Profile/interfaces/profile.type";

declare var ymaps: any;

export function useDeliveryMapViewModel() {
	const navigate = useNavigate()
	const point = organizationModel.selectOrganization
	const profile = profileModel.profile
	const { adress } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	
	const { data: ikkostreet, isLoading } = useQuery('street', async () => await RequestWebhook.getStreetCity({ organizationId: point?.guid, }))

	const [stateReduceMap, dispatchMap] = useReducer(
		CartMapReducer,
		initialStateCartMap
	);

	const mapstate = useMemo(() => {
		return { center: stateReduceMap.stateMap, zoom: 17 };
	}, [stateReduceMap.stateMap]);


	useEffect(() => {
		const query = searchParams.get('query')
		if (point) {
			if (adress && profile) {
				const adressValue = profile.adressdelivery.length !== 0 &&
					profile.adressdelivery.find((val) => val.address == adress)
				adressValue &&	initValuesMap(adressValue)
			}else if(query){
				const queryAddres = JSON.parse(query)
				queryAddres && initValuesMap(queryAddres)
			} else {
				getGeoLoc(point.info.cords)
			}
		}
		
	}, [adress, profile, point])

	
	const initialValues = {
		address: "",
		house: '',
		floor: '',
		entrance: '',
		intercom: '',
		flat: '',
	}

	const initValuesMap = (adressValue:IAddressDelivery) =>{
		const inivalue = {
			address: adressValue.address,
			house: adressValue.house,
			floor: adressValue.floor,
			entrance: adressValue.entrance,
			intercom: adressValue.intercom,
			flat: adressValue.flat,
		}
		formik.setValues(inivalue)
		onMapTyping().setValueMap(adressValue.kladrid)
		geoCodeAdress(`${adressValue.address},${adressValue.house}`)
	}
	


	const formik = useFormik({
		initialValues,
		validationSchema: shemaAdress(),
		onSubmit: async (values, meta) => {
			const adressbody = {
				city: point?.info.city,
				kladrid:stateReduceMap.valueMap,
				...values
			}
			if(profile){
				await profileUseCase.deliveryAdressUpdate(adressbody)
			}else{
				orderModel.actionOrderDeliveryAddress(adressbody)
			}
			
			
			navigate(-1)
		},
	});



	const getGeoLoc = useCallback((pointCords: number[]) => {
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
	}, [point]);



	const geoCodeAdress = (request: string) => {
		return ymaps.geocode(`${point?.info.city}, ${request}`)
			.then((res: any) => {
				const getObj = res.geoObjects.get(0);
				const validAdress: string = getObj?.properties.get('metaDataProperty.GeocoderMetaData.precision');
				const cords = [...getObj.geometry._coordinates]

				if (validAdress === 'exact') {
					onMapTyping().setStateMap(cords)
					onMapTyping().setExactCord(cords)
				}else if(validAdress === 'street'){

					onMapTyping().setExactCord(cords)
					onMapTyping().setStateMap(cords)
					onMapTyping().setDisclaimer(true)
				} else {
					onMapTyping().setDisclaimer(true)
				}
			})
			.catch((e: unknown) => console.log(e))
	}


	const onMapClick = (e: any) => {
		const cords = e.get("coords");
		axios
			.get<IGeoCodeResponse>(
				`https://geocode-maps.yandex.ru/1.x/?geocode=${cords.reverse()}&format=json&apikey=473431c9-b8f6-45d6-a166-243a0152c68b`
			)
			.then(({ data }) => {
				
				//console.log(data.response.GeoObjectCollection.featureMember[0].GeoObject);
				const validadress = data.response.GeoObjectCollection.featureMember[0].GeoObject.name
				if (!validadress) return
				const [street, house] = validadress.split(",")
					
				const ikko = ikkostreet && ikkostreet.data as IIkkoStreet[]
				const resulr = ikko && ikko.filter(function (el: IIkkoStreet) {
					if (!el.isDeleted) {

						return street.toUpperCase().indexOf(el.name.toUpperCase()) > -1 //el.name.indexOf(s) > -1;  /search(`/${el.name.toUpperCase()}/`)
					}
				});


				if (street && house) {
					if (resulr && resulr.length !== 0 && resulr.length > 1) {
						onMapTyping().setValueFomMap(resulr as [])
						dispatchMap({
							type: ReducerActionTypePoints.onMapClick,
							payload: {
								value: resulr[0]
							}
						});
						formik.setFieldValue("address", resulr[0].name || "")
						formik.setFieldValue("house", house || "")
					} else if (resulr && resulr.length && resulr.length == 1) {
						dispatchMap({
							type: ReducerActionTypePoints.onMapClick,
							payload: {
								value: resulr[0]
							}
						});
						formik.setFieldValue("address", resulr[0].name || "")
						formik.setFieldValue("house", house)
					} else {
						onMapTyping().setNotificate(true)
					}
				}


			});
	};

	//console.log(stateReduceMap);

	/**
		 * @description кейсы:
		 * @method setStateMap - в водимая область
		 * @method setExactCord - точные кординаты, точки
		 * @method setDisclaimer - предупреждение
		 * @method setNotificate - предупреждение при клике
		 * @method setValueMap - в введенное в поиске
		 * @method setValueFomMap - адреса при клика на карте если их больше 1
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
			setNotificate: (disc: boolean) =>
				dispatchMap({
					type: ReducerActionTypePoints.setNotificate,
					payload: disc
				}),	
			setValueMap: (val: null | IIkkoStreet) =>
				dispatchMap({
					type: ReducerActionTypePoints.setValueMap,
					payload: val
				}),
			setInputMap: (val: boolean) =>
				dispatchMap({
					type: ReducerActionTypePoints.setInputMap,
					payload: val
				}),
			setValueFomMap: (val: []) =>
				dispatchMap({
					type: ReducerActionTypePoints.setClickValueMap,
					payload: val
				})
		};
	};


	this.data({
		stateReduceMap,
		mapstate,
		point,
		adress,
		formik,
		ikkostreet
	});
	this.handlers({
		onMapTyping,
		geoCodeAdress,
		onMapClick,
		navigate
	});
	this.status({
		isLoading
	})
}



export interface IGeoCodeResponse {
	response: {
		GeoObjectCollection: {
			featureMember: Array<{
				GeoObject: {
					metaDataProperty: {
						GeocoderMetaData: {
							Address: {
								Components: Array<{
									kind: string,
									name: string
								}>
							}
						}
					}
					Point: {
						pos: string
					}
					name: string
				}
			}>,
			metaDataProperty: {
				GeocoderResponseMetaData: {
					found: string,
					requrest: string,
					results: string
				}
			}
		}
	}
}

