import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPointStatusMutation, useGetPointsQuery, useGetRecvisitesMutation } from "servises/repository/RTK/RTKLocation";
import { IPoint, IPointStatus } from "@types";
import {
    initialStatePoints,
    PointsReducer,
    ReducerActionTypePoints
} from "application/reducers/PointsReducer";
import { getGeoLocation } from "application/helpers/yandexapi";
import RequestProfile from "servises/repository/Axios/Request/Request.Profile";
import { setModal, setPoint } from "servises/redux/slice/locationSlice";
import { setProfileAction } from "servises/redux/slice/profileSlice";
import { ROUTE_APP } from "application/contstans/route.const";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { RootState } from 'servises/redux/createStore';
import { accessOrder, fetchDeleteCart, fetchRefreshCart, setOrderType } from "servises/redux/slice/cartSlice";
import { useRouter } from 'next/router'
import { CART_CHOICE } from "application/contstans/cart.const";
import RequestLocation from "servises/repository/Axios/Request/Request.Location";
import { ORG_STATUS } from "application/contstans/const.orgstatus";
import { Redirects } from "application/helpers/redirectTo";

export function usePoints(this: any,{selectCity,handleSelectOrganitztion}:any) {
  const dispatch = useDispatch();
  const router = useRouter()
	const [cityid,setCityId] = useState('')
  const {city,point} =  useSelector((state:RootState) => state.location)
  const { id } = adapterSelector.useSelectors((selector) => selector.point);
  const { data: addresses, isFetching } = useGetPointsQuery(cityid);
	const [getOrgstatus,{data:orgstatus}] = useGetPointStatusMutation()


  const handlerPoint = (address: IPoint, status:IPointStatus)=>{
		Redirects(address)
		if(status.organizationStatus === ORG_STATUS.OPEN || status.organizationStatus === ORG_STATUS.NOWORK) return
		handleSelectOrganitztion(address)
		getOrgstatus(address.guid)
    //dispatch(setPoint(address));
    dispatch(setModal(false))
    if (address.id !== point.id) {
      dispatch(fetchDeleteCart());
      dispatch(accessOrder());
    }
    
    RequestProfile.update({ organizationId: address.id });
    router.push(`${ROUTE_APP.MENU}/?address=${address.city + ',' + address.address}`)
  }

	


	useEffect(()=>{
		selectCity.id && setCityId(selectCity.id)
	},[selectCity.id])

  

  this.data({
    addresses,
    point,
    city
  })
  this.handlers({
    handlerPoint
  })
  this.status({
    isFetching
  })
}

export function usePointsMaps(this: any,{selectCity,handlerGoToCity,handlerCloseMapModal,handleSelectOrganitztion}:any) {
  const dispatch = useDispatch();
  const refMap = useRef<any>()
	const router = useRouter()
	/*
  const selectedCity = adapterSelector.useSelectors(
    (selector) => selector.city
  );
	*/
  const { id } = adapterSelector.useSelectors((selector) => selector.point);
  const { data: org, isFetching } = useGetPointsQuery(selectCity.id);
  const [getRecvisites, { data: recvisites }] = useGetRecvisitesMutation()
	const [getOrgstatus,{data:orgstatus}] = useGetPointStatusMutation()

  const [statePoint, dispatchPoint] = useReducer(
    PointsReducer,
    initialStatePoints
  );

  const addresses =  org && org.filter((val:IPoint,index:number) => val.isHidden !== true)

     
  useEffect(() => {
    if(addresses && !isFetching){
			getRecvisites(addresses[statePoint.slideIndex].id)
			
		}
  }, [statePoint.slideIndex,org]) 
  
    useEffect(() => {
        if (Object.keys(selectCity).length) {
          (addresses && !isFetching) && nearPoint(addresses);
          refMap.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        } else {
          handlerGoToCity()
        }
    }, []);

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
        const cord = await getGeoLocation();
        if (data) {
            const index = data.reduce(function (r, val, i, array) {
                return i &&
                    Math.abs(array[r].cords[0] - cord[0]) <
                        Math.abs(val.cords[0] - cord[0]) &&
                    Math.abs(array[r].cords[1] - cord[1]) <
                        Math.abs(val.cords[1] - cord[1])
                    ? r
                    : i;
            }, -1);

            dispatchPoint({
                type: ReducerActionTypePoints.slidePoint,
                payload: index
            });
        }
      } catch (error) {
        console.log(error)
      }
        
    };

    const selectPointHandler = async (address: IPoint, status:IPointStatus) => {
				if(status.organizationStatus === ORG_STATUS.OPEN || status.organizationStatus === ORG_STATUS.NOWORK) return
        try {
            const { data: regData } = await RequestProfile.register();
						Redirects(address)
            dispatch(setProfileAction(regData));
						handleSelectOrganitztion(address)
						getOrgstatus(address.guid)
            //dispatch(setPoint(address));
            if (address.id !== id) {
              dispatch(fetchDeleteCart());
              dispatch(accessOrder());
            }
            
            RequestProfile.update({ organizationId: address.id });
            handlerCloseMapModal()
						
						router.push(`${ROUTE_APP.MENU}`)
        } catch (error) {
            
        }
    };

    const recvisitesHandler = (change:boolean) => {
      dispatchPoint({
        type: ReducerActionTypePoints.recvisitesModal,
        payload: change
    });
    }

    this.data({
				selectCity,
        addresses,
        statePoint,
        recvisites,
        refMap
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
