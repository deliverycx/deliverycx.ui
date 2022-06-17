import { useMemo } from "react";
import { YMaps, Map, Placemark, withYMaps } from "react-yandex-maps";
import { useSelector } from 'react-redux';
import { RootState } from "servises/redux/createStore";
import MapSuggestComponent from "application/components/common/Maps/MapSuggest";
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useCartMap } from "domain/use-case/useCaseCart";
import cn from "classnames";

const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: "images/i/place-mark.svg",
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

const CartYmap = ({close}:any) => {
  const city = useSelector((state: RootState) => state.location.point.city);
  const usecaseCartMap = adapterComponentUseCase(useCartMap,close)
  const { stateReduceMap,mapstate } = usecaseCartMap.data
  const { onMapTyping,getGeoLoc,onMapClick,hendleMapPopup } = usecaseCartMap.handlers

  const CN = cn("search_city", { error_map: stateReduceMap.disclaimer })

  const SuggestComponent = useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
        "SuggestView",
        "geocode",
        "coordSystem.geo"
    ]);
  }, []);

  return (
    <div className="location_city location_Maps addres_map delivery-map">
      <div className="location_city-container delivery-map">
        <div className="close" onClick={close}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L12.9991 13M13 1L1.0009 13" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="modals_title">Укажите <span>адрес доставки</span></div>
        <YMaps
          enterprise
          query={{ apikey: "164ee8b6-9e22-4e21-84ed-a0778bdf0f37" }}
        >
          <Map className="welcome__map delivery-map" width="100" height="100" modules={["geocode"]} onClick={onMapClick}
               state={mapstate} defaultState={
            {
              center: stateReduceMap.myPosition,
              zoom: 17,
              controls: [],
              scrollZoom: false
            }
          }
          >
            <div className="welcome delivery-map">
              <div className="welcome__header">
                <div className={CN}>
                  {
                    !stateReduceMap.inputMap
                      ? <div className="mapsPopup__value"
                             onClick={() => onMapTyping().setInputMap(true)}>{stateReduceMap.valueMap}</div>
                      : <SuggestComponent dispatchMap={onMapTyping} stateReduceMap={stateReduceMap} />
                  }
                  <button></button>
                </div>
                {
                  (city || stateReduceMap.valueMap) &&
                    <div className="mapsPopup__button btn" onClick={hendleMapPopup}>Я здесь</div>
                }
              </div>
              {
                stateReduceMap.disclaimer && <div className="disclaimer">Не точный адрес, в ведите дом</div>
              }
            </div>
            <Placemark
              options={placeMarkOption}
              geometry={stateReduceMap.cord}
            />
          </Map>
        </YMaps>
      </div>
    </div>
  );
}
export default CartYmap
