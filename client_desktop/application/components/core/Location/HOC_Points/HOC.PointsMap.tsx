import { IPoint } from "@types";
import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import { usePoints, usePointsMaps } from "domain/use-case/useCaseLocation"
import React, { useContext } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { LocationPointsContext } from "../LocationLayout";
import PointRecvisites from "./view/PointRecvisites";
import PopupPoint from "./view/PopupPoint";

const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: "images/i/place-mark.svg",
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

export const PointsContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const PointsMap = () => {
  const useCaseLocationPoints = useContext(LocationPointsContext);
	const {selectCity} = useCaseLocationPoints.data
  const { handlerCloseMapModal,handlerGoToCity,handleSelectOrganitztion} = useCaseLocationPoints.handlers;

  const useCasePoints = adapterComponentUseCase(usePointsMaps,{selectCity,handlerGoToCity,handlerCloseMapModal,handleSelectOrganitztion})
  const { addresses,statePoint,refMap} = useCasePoints.data
  const { placemarkClickHandler} = useCasePoints.handlers


  return (
    <div ref={refMap} className="location_city location_Maps point-map">
  		<div className="location_city-container point-map">
  			<div className="close" onClick={handlerCloseMapModal} >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_329_8395)">
              <path d="M0 0L11.9991 12M12 0L0.00090279 12" stroke="#ABABAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_329_8395">
                <rect width="12" height="12" fill="white"/>
              </clipPath>
            </defs>
          </svg>
  			</div>
  			<div className="modals-top_box">
  				<div className="modals_title">Старик Хинкалыч <span>на карте</span></div>
          <div className="tomap_point-map" onClick={handlerGoToCity}>Выбрать другой город</div>
  			</div>

        {addresses &&
            <YMaps>
                <Map
                    className="welcome__map point-map"
                    width="100"
                    height="100"
                    defaultState={{
                      center: addresses[0] ? [addresses[statePoint.slideIndex].cords[0], addresses[statePoint.slideIndex].cords[1]] : [0.0, 0.0],
                      zoom: 18
                    }}
                    state={{
                      center: addresses[0] ? [addresses[statePoint.slideIndex].cords[0], addresses[statePoint.slideIndex].cords[1]] : [0.0, 0.0],
                      zoom: 18

                    }}
                >
                  {
                    addresses.map((address: IPoint, index: number) => {
                      return (
                        <Placemark
                          onClick={() => placemarkClickHandler(address, index)}
                          key={index}
                          options={placeMarkOption}
                          geometry={[address.cords[0], address.cords[1]]}
                        />
                      );
                    })
                  }
                  {
                    <PointsContext.Provider value={useCasePoints}>
                      {
                        statePoint.recvisites &&
                          <PointRecvisites />
                      }
                      <PopupPoint />
                    </PointsContext.Provider>

                  }
                </Map>
            </YMaps>
        }
  		</div>
	  </div>
  )
}
export default PointsMap
