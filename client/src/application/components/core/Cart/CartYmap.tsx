/* eslint-disable @typescript-eslint/no-var-requires */
import { IGeoCodeResponse } from "@types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { YMaps, Map, SearchControl, Placemark, YMapsApi, withYMaps, Polygon } from "react-yandex-maps";
import { useDispatch, useSelector } from 'react-redux';
import { setAdress } from "servises/redux/slice/cartSlice";
import { getGeoLocation } from "application/helpers/yandexapi";
import { RootState } from "servises/redux/createStore";
import MapSuggestComponent from "application/components/common/Maps/MapSuggest";
import { push } from 'connected-react-router';
import { ROUTE_APP } from "application/contstans/route.const";
import { useHistory } from "react-router-dom";
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useCartMap } from "domain/use-case/useCaseCart";


const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: require("assets/i/placemark.svg").default,
  iconImageSize: [50, 60],
  iconImageOffset: [-25, -60]
}

const CartYmap = () => {
  const city = useSelector((state: RootState) => state.location.point.city);
  const usecaseCartMap = adapterComponentUseCase(useCartMap)
  const { stateReduceMap,mapstate,zones } = usecaseCartMap.data
  const { onMapTyping,getGeoLoc,onMapClick,hendleMapPopup,hendleZone } = usecaseCartMap.handlers
	const {isLoadingZone} = usecaseCartMap.status

  const SuggestComponent = useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
        "SuggestView",
        "geocode",
        "coordSystem.geo"
    ]);
  }, []);

  return (
    <div className="address-select-map">
      <YMaps
        enterprise
        query={{ apikey: "164ee8b6-9e22-4e21-84ed-a0778bdf0f37" }}
      >
        <Map className="address-select-map map" modules={["geocode"]} onClick={onMapClick}
             state={mapstate} defaultState={
          {
            center: stateReduceMap.myPosition,
            zoom: 13,
            controls: [],
            scrollZoom: false
          }
        }
        >
          <Placemark
            options={placeMarkOption}
            geometry={stateReduceMap.cord}
          />

					{
						(zones && !isLoadingZone && stateReduceMap.dispalyzone) &&
						<Polygon options={{fillColor: '#6699ff',opacity:0.3}} geometry={[zones]}></Polygon>
					}
					

          {
            (city || stateReduceMap.valueMap) &&
              <>
                <div className="justify-between">
                  <div className="mapsPopup__adress-box">
                    <div className="mapsPopup__adress">
                      <img src={require("assets/i/mark-red.svg").default} alt="Телефон заведения" />
                      {
                        !stateReduceMap.inputMap
                            ? <div className="mapsPopup__value"
                                   onClick={() => onMapTyping().setInputMap(true)}>{stateReduceMap.valueMap}</div>
                            : <SuggestComponent dispatchMap={onMapTyping} stateReduceMap={stateReduceMap} />
                      }
                        {
                            stateReduceMap.disclaimer && <div className="disclaimer">Не точный адрес, введите дом</div>
                        }
                    </div>
                  </div>
                </div>
									{
										zones &&
										<button className="mapsPopup__btnzone btn" onClick={() => hendleZone(stateReduceMap.dispalyzone)} >{stateReduceMap.dispalyzone ? 'Скрыть зону доставки' : 'Показать зону доставки' }</button>
									}
                  <button
                      disabled={stateReduceMap.cord && !stateReduceMap.cord.length && !stateReduceMap.disclaimer || stateReduceMap.disclaimer}
                      className="mapsPopup__button btn" onClick={hendleMapPopup}>
                    <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M2.60807 7.61914H3.03612L2.72133 8.53454C2.11136 10.3081 3.12071 12.1844 4.73398 12.5735C4.91097 14.4977 6.40874 16 8.22991 16C10.028 16 11.5106 14.5358 11.7185 12.6468L19.4983 12.6481C19.7073 14.5358 21.1893 15.9987 22.9866 15.9987C24.927 15.9987 26.5 14.2934 26.5 12.1894C26.5 10.29 25.2182 8.71534 23.5414 8.42706C23.4907 8.16858 23.4121 7.91178 23.3023 7.65765L21.9382 4.49796C22.0664 4.54216 22.1837 4.56626 22.2837 4.56626C23.0592 4.56626 23.2951 3.88491 23.2951 3.04418C23.2951 2.20344 23.0592 1.52175 22.2837 1.52175C22.2238 1.52175 22.1578 1.52118 22.0868 1.52056L22.0698 1.52041L22.0673 1.52039C21.6819 1.51705 21.1608 1.51252 20.7063 1.58035L20.5154 1.06807C20.3439 0.607027 19.9313 0.305355 19.4729 0.305355L17.2551 0.305355C16.6341 0.305355 16.1307 0.85111 16.1307 1.52443C16.1307 2.19775 16.6341 2.74351 17.2551 2.74351H18.7145L18.8075 2.99328C18.8152 3.01371 18.8231 3.0338 18.8317 3.05355L21.2656 8.69123C21.571 9.39837 21.095 10.21 20.3748 10.21H17.1587L15.7712 6.17206C15.5663 5.57574 15.0411 5.18032 14.4542 5.18032H12.4459V2.28581C12.4459 1.02321 11.5022 0 10.3378 0L2.60807 0C1.44388 0 0.5 1.02321 0.5 2.28581L0.5 5.33333C0.5 6.5956 1.44388 7.61914 2.60807 7.61914ZM5.43619 7.61847L4.82829 9.38632C4.69129 9.78475 4.9629 10.209 5.35495 10.209H14.7587L13.8686 7.61847H10.3893L10.3378 7.61914L5.43619 7.61847ZM21.5938 12.3937C22.3428 12.0645 22.9351 11.4421 23.279 10.6824L23.2725 10.6971C23.9116 10.8401 24.3919 11.4538 24.3919 12.1894C24.3919 13.0308 23.7628 13.7132 22.9866 13.7132C22.2743 13.7132 21.6858 13.1386 21.5938 12.3937ZM6.88873 12.6468C7.06747 13.2655 7.60034 13.7145 8.22991 13.7145C8.85964 13.7145 9.39251 13.2655 9.57125 12.6468L8.83 12.6481C8.81216 12.6481 8.79448 12.6478 8.7768 12.6468H6.88873Z" />
                    </svg>
                    Заказать доставку
                  </button>
              </>
          }
        </Map>
      </YMaps>
    </div>
  );
}
export default CartYmap
