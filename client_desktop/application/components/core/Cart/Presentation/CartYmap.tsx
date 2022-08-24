import { useMemo } from "react";
import { YMaps, Map, Placemark, withYMaps, Polygon } from "react-yandex-maps";
import { useSelector } from 'react-redux';
import { RootState } from "servises/redux/createStore";
import MapSuggestComponent from "application/components/common/Maps/MapSuggest";
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useCartMap } from "domain/use-case/useCaseCart";
import cn from "classnames";
import abstract from './../../../../../domain/entities/Entities';

const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: "images/i/place-mark.svg",
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

const CartYmap = ({close}:any) => {
  const city = useSelector((state: RootState) => state.location.point.city);
  const usecaseCartMap = adapterComponentUseCase(useCartMap,close)
  const { stateReduceMap, mapstate,zones } = usecaseCartMap.data
  const { onMapTyping,getGeoLoc,onMapClick,hendleMapPopup,hendleZone } = usecaseCartMap.handlers
	const {isLoadingZone} = usecaseCartMap.status

  const CN = cn("search_city delivery-map", { error_map: stateReduceMap.disclaimer })

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
                </div>
                {
                  (city || stateReduceMap.valueMap) &&
                    <button disabled={!stateReduceMap.valueMap} className="mapsPopup__button btn" onClick={hendleMapPopup}>Я здесь</button>
                }
              </div>
              {
                stateReduceMap.disclaimer && <div className="disclaimer">Не точный адрес, в ведите дом</div>
              }
							{
										zones &&
										<a className="mapsPopup__btnzone" onClick={() => hendleZone(stateReduceMap.dispalyzone)} >{stateReduceMap.dispalyzone ? 'Скрыть зону доставки' : 'Показать зону доставки' }</a>
							}
            </div>

						{
						(zones && !isLoadingZone && stateReduceMap.dispalyzone) &&
							<Polygon options={{fillColor: '#6699ff',opacity:0.3}} geometry={[zones]}></Polygon>
						}
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
