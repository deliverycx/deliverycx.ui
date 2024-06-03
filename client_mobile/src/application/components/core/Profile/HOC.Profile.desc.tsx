import { adapterComponentUseCase } from 'adapters/adapterComponents';
import LayoutDesctop from 'application/components/common/Layout/LayoutDesctop';
import { useProfileViewModel } from './Profile.viewModel';
import { ROUTE_APP } from 'application/contstans/route.const';
import HOCDeliveryAdress from './DeliveryAdress/HOC.DeliveryAdress';
import HOCDeliveryAdressDesc from './DeliveryAdress/HOC.DeliveryAdress.desc';
import { observer } from 'mobx-react-lite';
import HOCUserOrders from './UserOrders/HOC.UserOrders';
import HOCUserOrdersDesc from './UserOrders/HOC.UserOrders.desc';
import { NavLink } from 'react-router-dom';

const HOCProfileDesc = () => {
  const useCase = adapterComponentUseCase(useProfileViewModel);
  const { profile, user, point } = useCase.data;
  const { logout } = useCase.handlers;

  return (
    <LayoutDesctop>
      {profile && user && (
        <div className="profile-desc">
          <div className="profile-desc-left">
            <div className="profile-desc_personal-box profile-desc_box">
              <div className="profile-desc_box-title">
                <div className="box-title_img">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                      fill="#8D191D"
                    />
                  </svg>
                </div>
                <div className="box-title_title">Личные данные</div>
              </div>
              <div className="personal-box">
                <div className="personal-box_title">
                  {profile.personal && profile.personal.name ? (
                    profile.personal.name
                  ) : (
                    <a href={ROUTE_APP.PROFILE.PROFILE_PERSONAL}>
                      Добавить имя
                    </a>
                  )}
                </div>
                <div className="personal-box_phone">{user.phone}</div>
              </div>
              <a
                href={ROUTE_APP.PROFILE.PROFILE_PERSONAL}
                className="profile-desc_box_imgbutton"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9125 3.075 16.7875C3.125 16.6625 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.3375 20.875 7.2125 20.925C7.0875 20.975 6.95833 21 6.825 21H4ZM14.325 9.675L13.625 8.975L15.025 10.375L14.325 9.675Z"
                    fill="#8D191D"
                  />
                </svg>{' '}
                <span>Изменить данные</span>
              </a>
              <button onClick={logout} className="profile-desc_box_imgbutton">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.825 16.275C15.6417 16.0583 15.55 15.8125 15.55 15.5375C15.55 15.2625 15.6417 15.0333 15.825 14.85L17.675 13H10.5C10.2167 13 9.97917 12.9042 9.7875 12.7125C9.59583 12.5208 9.5 12.2833 9.5 12C9.5 11.7167 9.59583 11.4792 9.7875 11.2875C9.97917 11.0958 10.2167 11 10.5 11H17.675L15.825 9.15C15.625 8.95 15.525 8.7125 15.525 8.4375C15.525 8.1625 15.625 7.925 15.825 7.725C16.0083 7.525 16.2375 7.425 16.5125 7.425C16.7875 7.425 17.0167 7.51667 17.2 7.7L20.8 11.3C20.9 11.4 20.9708 11.5083 21.0125 11.625C21.0542 11.7417 21.075 11.8667 21.075 12C21.075 12.1333 21.0542 12.2583 21.0125 12.375C20.9708 12.4917 20.9 12.6 20.8 12.7L17.2 16.3C16.9833 16.5167 16.7458 16.6125 16.4875 16.5875C16.2292 16.5625 16.0083 16.4583 15.825 16.275ZM5.5 21C4.95 21 4.47917 20.8042 4.0875 20.4125C3.69583 20.0208 3.5 19.55 3.5 19V5C3.5 4.45 3.69583 3.97917 4.0875 3.5875C4.47917 3.19583 4.95 3 5.5 3H11.5C11.7833 3 12.0208 3.09583 12.2125 3.2875C12.4042 3.47917 12.5 3.71667 12.5 4C12.5 4.28333 12.4042 4.52083 12.2125 4.7125C12.0208 4.90417 11.7833 5 11.5 5H5.5V19H11.5C11.7833 19 12.0208 19.0958 12.2125 19.2875C12.4042 19.4792 12.5 19.7167 12.5 20C12.5 20.2833 12.4042 20.5208 12.2125 20.7125C12.0208 20.9042 11.7833 21 11.5 21H5.5Z"
                    fill="#8D191D"
                  />
                </svg>{' '}
                <span>Выйти из аккаунта</span>
              </button>
            </div>

            <div className="profile-desc_personal-box profile-desc_box">
              <div className="profile-desc_box-title">
                <div className="box-title_img">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.99935 21C4.71602 21 4.45769 20.9125 4.22435 20.7375C3.99102 20.5625 3.83269 20.3333 3.74935 20.05L0.949353 9.95C0.86602 9.71667 0.90352 9.5 1.06185 9.3C1.22019 9.1 1.43269 9 1.69935 9H6.74935L11.1494 2.45C11.2327 2.31667 11.3494 2.20833 11.4994 2.125C11.6494 2.04167 11.8077 2 11.9744 2C12.141 2 12.2994 2.04167 12.4494 2.125C12.5994 2.20833 12.716 2.31667 12.7994 2.45L17.1994 9H22.2994C22.566 9 22.7785 9.1 22.9369 9.3C23.0952 9.5 23.1327 9.71667 23.0494 9.95L20.2494 20.05C20.166 20.3333 20.0077 20.5625 19.7744 20.7375C19.541 20.9125 19.2827 21 18.9994 21H4.99935ZM11.9994 17C12.5494 17 13.0202 16.8042 13.4119 16.4125C13.8035 16.0208 13.9994 15.55 13.9994 15C13.9994 14.45 13.8035 13.9792 13.4119 13.5875C13.0202 13.1958 12.5494 13 11.9994 13C11.4494 13 10.9785 13.1958 10.5869 13.5875C10.1952 13.9792 9.99935 14.45 9.99935 15C9.99935 15.55 10.1952 16.0208 10.5869 16.4125C10.9785 16.8042 11.4494 17 11.9994 17ZM9.17435 9H14.7994L11.9744 4.8L9.17435 9Z"
                      fill="#8D191D"
                    />
                  </svg>
                </div>
                <div className="box-title_title">Адреса доставки</div>
              </div>
              <div className="personal-box">
                {point ? (
                  <HOCDeliveryAdressDesc />
                ) : (
                  <div className="delivery-addresses__list">
                    <div className="delivery-addresses__list__items">
                      <h3>
                        Что бы добавить адрес,{' '}
                        <a href={ROUTE_APP.CITY}>выберете заведение</a>
                      </h3>
                    </div>
                    <div className="delivery-addresses__buttons">
                      <NavLink
                        to={`${ROUTE_APP.MAIN}`}
                        className="btn btn-md btn-red gap-4"
                      >
                        На главную
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="profile-desc-right">
            <div className="profile-desc_personal-box profile-desc_box">
              <div className="profile-desc_box-title">
                <div className="box-title_img">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 17C8.28333 17 8.52083 16.9042 8.7125 16.7125C8.90417 16.5208 9 16.2833 9 16C9 15.7167 8.90417 15.4792 8.7125 15.2875C8.52083 15.0958 8.28333 15 8 15C7.71667 15 7.47917 15.0958 7.2875 15.2875C7.09583 15.4792 7 15.7167 7 16C7 16.2833 7.09583 16.5208 7.2875 16.7125C7.47917 16.9042 7.71667 17 8 17ZM8 13C8.28333 13 8.52083 12.9042 8.7125 12.7125C8.90417 12.5208 9 12.2833 9 12C9 11.7167 8.90417 11.4792 8.7125 11.2875C8.52083 11.0958 8.28333 11 8 11C7.71667 11 7.47917 11.0958 7.2875 11.2875C7.09583 11.4792 7 11.7167 7 12C7 12.2833 7.09583 12.5208 7.2875 12.7125C7.47917 12.9042 7.71667 13 8 13ZM8 9C8.28333 9 8.52083 8.90417 8.7125 8.7125C8.90417 8.52083 9 8.28333 9 8C9 7.71667 8.90417 7.47917 8.7125 7.2875C8.52083 7.09583 8.28333 7 8 7C7.71667 7 7.47917 7.09583 7.2875 7.2875C7.09583 7.47917 7 7.71667 7 8C7 8.28333 7.09583 8.52083 7.2875 8.7125C7.47917 8.90417 7.71667 9 8 9ZM12 17H16C16.2833 17 16.5208 16.9042 16.7125 16.7125C16.9042 16.5208 17 16.2833 17 16C17 15.7167 16.9042 15.4792 16.7125 15.2875C16.5208 15.0958 16.2833 15 16 15H12C11.7167 15 11.4792 15.0958 11.2875 15.2875C11.0958 15.4792 11 15.7167 11 16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM12 13H16C16.2833 13 16.5208 12.9042 16.7125 12.7125C16.9042 12.5208 17 12.2833 17 12C17 11.7167 16.9042 11.4792 16.7125 11.2875C16.5208 11.0958 16.2833 11 16 11H12C11.7167 11 11.4792 11.0958 11.2875 11.2875C11.0958 11.4792 11 11.7167 11 12C11 12.2833 11.0958 12.5208 11.2875 12.7125C11.4792 12.9042 11.7167 13 12 13ZM12 9H16C16.2833 9 16.5208 8.90417 16.7125 8.7125C16.9042 8.52083 17 8.28333 17 8C17 7.71667 16.9042 7.47917 16.7125 7.2875C16.5208 7.09583 16.2833 7 16 7H12C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z"
                      fill="#8D191D"
                    />
                  </svg>
                </div>
                <div className="box-title_title">Заказы</div>
              </div>
              {point ? (
                <HOCUserOrdersDesc />
              ) : (
                <div className="delivery-addresses__list">
                  <div className="delivery-addresses__list__items">
                    <h3>
                      Чтобы совершить свой первый заказ,{' '}
                      <a href={ROUTE_APP.CITY}>выберете заведение</a>{' '}
                    </h3>
                  </div>
                  <div className="delivery-addresses__buttons">
                    <NavLink
                      to={`${ROUTE_APP.MAIN}`}
                      className="btn btn-md btn-red gap-4"
                    >
                      На главную
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </LayoutDesctop>
  );
};
export default observer(HOCProfileDesc);
