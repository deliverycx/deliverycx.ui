/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { useGetPointsQuery, useGetPointStatusMutation, useGetRecvisitesMutation } from "servises/repository/RTK/RTKLocation";
import { IPoint } from "@types";
import {
    initialStatePoints,
    PointsReducer,
    ReducerActionTypePoints
} from "application/reducers/PointsReducer";
import { getGeoLocation } from "application/helpers/yandexapi";
import RequestProfile from "servises/repository/Axios/Request/Request.Profile";
import { setPoint } from "servises/redux/slice/locationSlice";
import { setProfileAction } from "servises/redux/slice/profileSlice";
import { ROUTE_APP } from "application/contstans/route.const";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { fetchDeleteCart, fetchRefreshCart, setOrderType } from "servises/redux/slice/cartSlice";
import _ from "lodash";
import { fetStopList, setRefreshShop } from "servises/redux/slice/shopSlice";
import { DELIVERY_METODS, ORG_STATUS } from "application/contstans/const.orgstatus";
import { Redirects } from "application/helpers/redirectTo";
import { useOrganizationStatus } from "application/hooks/useOrganizationStatus";

export function usePoints() {
  const history = useHistory();
  const dispatch = useDispatch();

	


  const selectedCity = adapterSelector.useSelectors(
    (selector) => selector.city
  );
  const { id,isHidden } = adapterSelector.useSelectors((selector) => selector.point);
	const pointstatus = adapterSelector.useSelectors(selector => selector.pointstatus)

	////редирект
	if(process.env.NODE_ENV === 'production'){
		//window.location.href = process.env.REACT_APP_REDIRECT as string
	}
	
  const { data: org, isFetching } = useGetPointsQuery(selectedCity.id);
  const [getRecvisites, { data: recvisites }] = useGetRecvisitesMutation()
	const [getOrgstatus,{data:orgstatus}] = useGetPointStatusMutation()
	const [tsx,switchMetod] = useOrganizationStatus()


  const [statePoint, dispatchPoint] = useReducer(
    PointsReducer,
    initialStatePoints
  );


	const addresses =  org && org.filter((val:IPoint,index:number) => val.isHidden !== true)



  useEffect(() => {
    if(addresses && !isFetching){
			getRecvisites(addresses[statePoint.slideIndex].guid)
			getOrgstatus(addresses[statePoint.slideIndex].guid)
			
		}
  }, [statePoint.slideIndex,org])

    useEffect(() => {
        if (Object.keys(selectedCity).length) {
          if(addresses && !isFetching) {
						nearPoint(addresses); 
					}
        } else {
            history.goBack();
        }
    }, [org]);

    const placemarkClickHandler = (address: IPoint, index: number) => {
        dispatchPoint({
            type: ReducerActionTypePoints.placemarkClick,
            payload: { address, index }
        });
    };
    const buttonClickHandler = () => {
        if (addresses) {
            dispatchPoint({
                type: ReducerActionTypePoints.buttonClick,
                payload: addresses[statePoint.slideIndex]
            });
        }
    };
    const SlidePointsHandler = (triger: string) => {
        if (addresses) {
            if (triger === "prev") {
                dispatchPoint({
                    type: ReducerActionTypePoints.slidePoint,
                    payload:
                        statePoint.slideIndex <= 0
                            ? addresses.length - 1
                            : statePoint.slideIndex - 1
                });
            } else if (triger === "next") {
                dispatchPoint({
                    type: ReducerActionTypePoints.slidePoint,
                    payload:
                        statePoint.slideIndex == addresses.length - 1
                            ? 0
                            : statePoint.slideIndex + 1
                });
          }
        }
    };
    const nearPoint = async (data: IPoint[]) => {
      try {
        //const cord = await getGeoLocation();
				console.log('near')
        if (data) {
						/*
            const index = data.reduce(function (r, val, i, array) {
                return i &&
                    Math.abs(array[r].cords[0] - cord[0]) <
                        Math.abs(val.cords[0] - cord[0]) &&
                    Math.abs(array[r].cords[1] - cord[1]) <
                        Math.abs(val.cords[1] - cord[1])
                    ? r
                    : i;
            }, -1);
						*/
						const randomindex = Math.floor(Math.random() * data.length)
						//console.log(_.shuffle(_.range(0,data.length)).slice(0,20))


            dispatchPoint({
                type: ReducerActionTypePoints.slidePoint,
                payload: randomindex
            });
        }
      } catch (error) {
        console.log(error)
      }
    };

    const selectPointHandler = async (address: IPoint) => {
        try {
						await Redirects(address)
            const { data: regData } = await RequestProfile.register();
						 

            //dispatch(setProfileAction(regData));
            dispatch(setPoint(address));
						if(address.id !== id){
							dispatch(setOrderType(DELIVERY_METODS.COURIER))
							dispatch(fetchRefreshCart())
							dispatch(setRefreshShop())
						} 
						if(tsx.PickupOnSPOT()){
							dispatch(setOrderType(DELIVERY_METODS.PICKUP))
						}
            history.push(`${ROUTE_APP.SHOP.SHOP_MAIN}/?address=${address.city + ',' + address.address}` );
            //RequestProfile.update({ organizationId: address.id });
        } catch (error) {
            history.goBack();
        }
    };

    const recvisitesHandler = (change:boolean) => {
      dispatchPoint({
        type: ReducerActionTypePoints.recvisitesModal,
        payload: change
    });
    }

    this.data({
        selectedCity,
        addresses,
        statePoint,
        recvisites
    });
    this.handlers({
        placemarkClickHandler,
        buttonClickHandler,
        SlidePointsHandler,
        selectPointHandler,
        nearPoint,
        recvisitesHandler,
        getRecvisites
    });
    this.status({
        isFetching
    });
}
