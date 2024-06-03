import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import TabBar from 'application/components/common/TabBar/TabBar';
import { profileModel, profileUseCase } from 'modules/Profile/profile.module';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { cityModel } from 'modules/CityModule/city.module';
import HOCDeliveryMapDesc from 'application/components/common/Maps/DeliveryMap/HOC.DeliveryMap.desc';

const HOCDeliveryAdressDesc = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const profile = profileModel.profile;
  const city = cityModel.selectCity;

  const handlerUpdate = (value: any) => {
    profileUseCase.deliveryAdressUpdate(value);
    navigate(ROUTE_APP.PROFILE.PROFILE_MAP + '/' + value.address);
  };

  //console.log(params.pathname.includes(ROUTE_APP.PROFILE.PROFILE_MAP));

  return (
    <div className="">
      {params.pathname.includes(ROUTE_APP.PROFILE.PROFILE_MAP) && (
        <HOCDeliveryMapDesc />
      )}
      {profile && profile.adressdelivery.length === 0 && (
        <div className="delivery-addresses__list">
          <div className="delivery-addresses__list__items">
            <h3>Список пуст</h3>
          </div>
        </div>
      )}
      {profile && profile.adressdelivery && (
        <div className="delivery-addresses__list">
          <div className="delivery-addresses__list__items">
            {profile.adressdelivery.map((value) =>
              city?.cityname === value.city ? (
                <div
                  key={value.address}
                  className="delivery-addresses__list__items-item"
                >
                  {value.address}, {value.house}
                  <div className="d-flex flex-center justify-center modal__btn no-drag">
                    <button
                      className="btn btn-none btn-mini"
                      onClick={() => handlerUpdate(value)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9125 3.075 16.7875C3.125 16.6625 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.3375 20.875 7.2125 20.925C7.0875 20.975 6.95833 21 6.825 21H4ZM14.325 9.675L13.625 8.975L15.025 10.375L14.325 9.675Z"
                          fill="#8D191D"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn btn-none btn-mini"
                      onClick={() => profileUseCase.deliveryAdressDelite(value)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                          fill="#8D191D"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={value.address}
                  className="delivery-addresses__list__items-nocity"
                >
                  {value.address}, {value.house}
                  <small>{value.city}</small>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      <div className="delivery-addresses__buttons">
        <NavLink
          to={`${ROUTE_APP.PROFILE.PROFILE_MAP}`}
          className="btn btn-md btn-red gap-4"
        >
          <img src={require('assets/images/icons/add_white.png')} alt="" />
          Добавить новый адрес
        </NavLink>
      </div>
    </div>
  );
};
export default observer(HOCDeliveryAdressDesc);
