import { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { useGetPointsQuery, useGetRecvisitesMutation } from "servises/repository/RTK/RTKLocation";
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

export function usePoints() {
  const history = useHistory();
  const dispatch = useDispatch();

  const selectedCity = adapterSelector.useSelectors(
    (selector) => selector.city
  );
  const { id } = adapterSelector.useSelectors((selector) => selector.point);
  const { data: org, isFetching } = useGetPointsQuery(selectedCity.id);
  const [getRecvisites, { data: recvisites }] = useGetRecvisitesMutation()

  const [statePoint, dispatchPoint] = useReducer(
    PointsReducer,
    initialStatePoints
  );

  const addresses =  org && org.filter((val:IPoint,index:number) => val.isHidden !== true)


  useEffect(() => {
    (addresses && !isFetching) && getRecvisites(addresses[statePoint.slideIndex].id)
  }, [statePoint.slideIndex])

    useEffect(() => {
        if (Object.keys(selectedCity).length) {
          (addresses && !isFetching) && nearPoint(addresses);
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
            const { data: regData } = await RequestProfile.register();
            /*
      if (regData.isNew) {
        localStorage.setItem("authToken", regData.access!);
      }

      const { data } = await RequestProfile.update({
        organization: address._id,
      })
      */

            dispatch(setProfileAction(regData));
            dispatch(setPoint(address));
            address.id !== id && dispatch(fetchDeleteCart());
						if(address.delivMetod){
							dispatch(setOrderType(address.delivMetod))
							dispatch(fetchRefreshCart())
						} 
            history.push(ROUTE_APP.SHOP.SHOP_MAIN);
            RequestProfile.update({ organizationId: address.id });
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
