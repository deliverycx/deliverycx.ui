/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ROUTE_APP } from 'application/contstans/route.const';
import { basketModel } from 'modules/BasketModule/basket.module';
import { requestOrganizationAdmin } from 'modules/OrganizationModule/Organization/data/organization.request';
import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { userModel } from 'modules/UserModule/user.module';
import { useState, useEffect, FC } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import MainMenuDesc from '../Menu/MainMenu.desc';
import { observer } from 'mobx-react-lite';
import ModalCard from '../Modals/ModalCard';
import OfferAuth from '../Auth/view/OfferAuth';
import HOCAUTHDesc from '../Auth/HOC.Auth.desc';
import NotificatCity from 'application/components/core/City/view/NotificatCity';
import HOCCITYDesc from 'application/components/core/City/HOC.City.desc';
import HOCOrganizationsDesc from 'application/components/core/Organization/HOC.Organizations.desc';

const HOCdescHead: FC<{ styles?: string }> = ({ styles }) => {
  const point = organizationModel.selectOrganization;
  const user = userModel.guestUser;
  const cartprice = basketModel.basketPrice;
  const navigate = useNavigate();

  const params = useLocation();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [goodPlaceId, setGoodPlaceId] = useState<string>('');

  useEffect(() => {
    const getGoodPlaceId = async (id: string) => {
      try {
        const { data } =
          await requestOrganizationAdmin.getByOrganizationGoodPlaceId(id);
        setGoodPlaceId(data.goodplaceid);
      } catch (error) {
        console.log(error);
      }
    };

    point && getGoodPlaceId(point.guid);
  }, [point]);

  function formatPhoneNumber(phoneNumber: string) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
      return (
        '+' +
        match[1] +
        ' ' +
        match[2] +
        ' ' +
        match[3] +
        '-' +
        match[4] +
        '-' +
        match[5]
      );
    }

    return null;
  }

  return (
    <>
      <div className={`head-desc ${styles}`}>
        <section>
          <a href="/">
            <img
              src={require('assets/images/logo.svg').default}
              alt="Старик Хинкалыч"
            />
          </a>

          {point && (
            <>
              <div className="head_point">
                <div
                  className="head_point-adress"
                  onClick={() => navigate(ROUTE_APP.POINT)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.99995 6C4.71662 6 4.47912 5.90417 4.28745 5.7125C4.09578 5.52083 3.99995 5.28333 3.99995 5C3.99995 4.71667 4.09578 4.47917 4.28745 4.2875C4.47912 4.09583 4.71662 4 4.99995 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9041 4.47917 20 4.71667 20 5C20 5.28333 19.9041 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6H4.99995ZM4.99995 20C4.71662 20 4.47912 19.9042 4.28745 19.7125C4.09578 19.5208 3.99995 19.2833 3.99995 19V14H3.82495C3.50828 14 3.24995 13.8792 3.04995 13.6375C2.84995 13.3958 2.78328 13.1167 2.84995 12.8L3.84995 7.8C3.89995 7.56667 4.01662 7.375 4.19995 7.225C4.38328 7.075 4.59162 7 4.82495 7H19.175C19.4083 7 19.6166 7.075 19.8 7.225C19.9833 7.375 20.1 7.56667 20.15 7.8L21.15 12.8C21.2166 13.1167 21.15 13.3958 20.95 13.6375C20.75 13.8792 20.4916 14 20.175 14H20V19C20 19.2833 19.9041 19.5208 19.7125 19.7125C19.5208 19.9042 19.2833 20 19 20C18.7166 20 18.4791 19.9042 18.2875 19.7125C18.0958 19.5208 18 19.2833 18 19V14H14V19C14 19.2833 13.9041 19.5208 13.7125 19.7125C13.5208 19.9042 13.2833 20 13 20H4.99995ZM5.99995 18H12V14H5.99995V18Z"
                      fill="#8D191D"
                    />
                  </svg>
                  <span>
                    {point.info.city},{point.info.address}
                  </span>
                </div>
                <div className="head_goodplase">
                  {goodPlaceId && (
                    <div className="goodpalese">
                      <iframe
                        src={`https://yandex.ru/sprav/widget/rating-badge/${goodPlaceId}?type=award`}
                        width="150"
                        height="50"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  )}
                </div>
                <NotificatCity />
              </div>
            </>
          )}
        </section>

        <section>
          {point && (
            <div className="head-phone">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.95 21C17.8 21 15.7042 20.5208 13.6625 19.5625C11.6208 18.6042 9.8125 17.3375 8.2375 15.7625C6.6625 14.1875 5.39583 12.3792 4.4375 10.3375C3.47917 8.29583 3 6.2 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.075 8.725 3.225C8.90833 3.375 9.01667 3.56667 9.05 3.8L9.7 7.3C9.73333 7.53333 9.72917 7.74583 9.6875 7.9375C9.64583 8.12917 9.55 8.3 9.4 8.45L7 10.9C7.7 12.1 8.575 13.225 9.625 14.275C10.675 15.325 11.8333 16.2333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15 20.625 15.1125 20.775 15.2875C20.925 15.4625 21 15.6667 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                  fill="#333333"
                />
              </svg>
              <a href={`tel:${point.info.phone}`}>
                {formatPhoneNumber(point.info.phone)}
              </a>
            </div>
          )}
          {/*
						
						<div className="head-auth tabcart_disable">
					<div className="coming_soon">
										Скоро
									</div>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z" fill="#333333" />
						</svg>
						{
							//user && user.phone ? <NavLink to={ROUTE_APP.PROFILE.PROFILE_MAIN}>Профиль</NavLink> : <NavLink to={ROUTE_APP.AUTH.AUTORIZATE}>Войти</NavLink>
						}
						<a>Войти</a>
					</div>
						*/}

          {point && (
            <div className="head-cart">
              {cartprice && cartprice.fullPrice !== 0 ? (
                <NavLink to={ROUTE_APP.CART.BASKET_MAIN}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.21325 3.73845H14.7871C15.4712 3.73845 16.0258 4.29293 16.0258 4.9769V5.59613H7.97461V4.9769C7.97461 4.29293 8.52915 3.73845 9.21325 3.73845ZM6.73597 5.59613V4.9769C6.73597 3.60895 7.84505 2.5 9.21325 2.5H14.7871C16.1552 2.5 17.2644 3.60895 17.2644 4.9769V5.59613H17.5731C19.1578 5.59613 19.4314 6.79238 19.5973 8.36816L21.4227 18.0231C21.6151 19.8512 20.1816 21.4433 18.3432 21.4433H5.65698C3.81853 21.4433 2.38495 19.8512 2.5774 18.0231L4.40276 8.36816C4.56866 6.79238 4.8423 5.59613 6.427 5.59613H6.73597ZM13.7856 8.28943C14.0756 8.54208 14.0418 8.95436 13.8894 9.2971C13.1251 11.0154 14.399 11.7717 15.6897 12.538C16.3037 12.9025 16.9215 13.2693 17.3256 13.743C18.3318 14.9228 17.8761 16.8329 16.7621 17.8272C15.5022 18.9516 13.6963 19.4024 12.0152 19.4024C10.3374 19.4024 8.52438 18.9482 7.26828 17.8272C6.13861 16.819 5.63897 14.9927 6.70489 13.743C7.10398 13.2751 7.72032 12.9151 8.33481 12.5561C9.63117 11.799 10.9192 11.0466 10.1411 9.2971C9.98857 8.95436 9.95482 8.54208 10.2448 8.28943C11.2433 7.41961 12.7871 7.41961 13.7856 8.28943ZM12.0152 11.8717C11.4844 13.2985 11.4844 15.634 12.0152 17.0471C12.5461 15.634 12.5461 13.2985 12.0152 11.8717ZM10.6881 11.8657C11.3046 12.6941 10.5779 13.5133 9.85338 14.3301C9.33012 14.92 8.80797 15.5087 8.79379 16.0987C8.20612 15.2925 8.91412 14.4887 9.62578 13.6808C10.1559 13.0789 10.6881 12.4748 10.6881 11.8657ZM13.3424 11.8657C12.726 12.6941 13.4526 13.5133 14.1771 14.3301C14.7004 14.92 15.2226 15.5087 15.2367 16.0987C15.8244 15.2925 15.1163 14.4887 14.4047 13.6808C13.8745 13.0789 13.3424 12.4748 13.3424 11.8657Z"
                      fill="white"
                    />
                  </svg>
                  <span>{cartprice.fullPrice} ₽</span>
                </NavLink>
              ) : (
                <a>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.21325 3.73845H14.7871C15.4712 3.73845 16.0258 4.29293 16.0258 4.9769V5.59613H7.97461V4.9769C7.97461 4.29293 8.52915 3.73845 9.21325 3.73845ZM6.73597 5.59613V4.9769C6.73597 3.60895 7.84505 2.5 9.21325 2.5H14.7871C16.1552 2.5 17.2644 3.60895 17.2644 4.9769V5.59613H17.5731C19.1578 5.59613 19.4314 6.79238 19.5973 8.36816L21.4227 18.0231C21.6151 19.8512 20.1816 21.4433 18.3432 21.4433H5.65698C3.81853 21.4433 2.38495 19.8512 2.5774 18.0231L4.40276 8.36816C4.56866 6.79238 4.8423 5.59613 6.427 5.59613H6.73597ZM13.7856 8.28943C14.0756 8.54208 14.0418 8.95436 13.8894 9.2971C13.1251 11.0154 14.399 11.7717 15.6897 12.538C16.3037 12.9025 16.9215 13.2693 17.3256 13.743C18.3318 14.9228 17.8761 16.8329 16.7621 17.8272C15.5022 18.9516 13.6963 19.4024 12.0152 19.4024C10.3374 19.4024 8.52438 18.9482 7.26828 17.8272C6.13861 16.819 5.63897 14.9927 6.70489 13.743C7.10398 13.2751 7.72032 12.9151 8.33481 12.5561C9.63117 11.799 10.9192 11.0466 10.1411 9.2971C9.98857 8.95436 9.95482 8.54208 10.2448 8.28943C11.2433 7.41961 12.7871 7.41961 13.7856 8.28943ZM12.0152 11.8717C11.4844 13.2985 11.4844 15.634 12.0152 17.0471C12.5461 15.634 12.5461 13.2985 12.0152 11.8717ZM10.6881 11.8657C11.3046 12.6941 10.5779 13.5133 9.85338 14.3301C9.33012 14.92 8.80797 15.5087 8.79379 16.0987C8.20612 15.2925 8.91412 14.4887 9.62578 13.6808C10.1559 13.0789 10.6881 12.4748 10.6881 11.8657ZM13.3424 11.8657C12.726 12.6941 13.4526 13.5133 14.1771 14.3301C14.7004 14.92 15.2226 15.5087 15.2367 16.0987C15.8244 15.2925 15.1163 14.4887 14.4047 13.6808C13.8745 13.0789 13.3424 12.4748 13.3424 11.8657Z"
                      fill="white"
                    />
                  </svg>
                  Корзина
                </a>
              )}
            </div>
          )}
        </section>
      </div>
      <MainMenuDesc />

      {params.pathname === ROUTE_APP.AUTH.AUTORIZATE && (
        <ModalCard
          setIsOpened={() => navigate(-1)}
          theme={null}
          styles="login-container_modal"
        >
          <OfferAuth />
        </ModalCard>
      )}
      {params.pathname === ROUTE_APP.CITY && <HOCCITYDesc />}
      {params.pathname === ROUTE_APP.POINT && <HOCOrganizationsDesc />}
    </>
  );
};
export default observer(HOCdescHead);
