import CartSmall from "application/components/core/Cart/HOC_CartSmall/HOC.CartSmall";
import { useDispatch } from "react-redux";
import { setMapModal, setModal } from "servises/redux/slice/locationSlice";
import HeaderLocation from "./HeaderLocation";
import Link from 'next/link'
import { checkPoint } from "application/helpers/checkPoint";
import { useCallback } from "react";
import { useRouter } from 'next/router'
import { ROUTE_APP } from 'application/contstans/route.const';

/* eslint-disable react/no-unknown-property */
const Header = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const heandleToMenu = useCallback(() => {
    if (checkPoint(false)) {
      router.push(ROUTE_APP.MENU)
    } else {
      dispatch(setModal(true))
    }
  },[router.asPath])

    return (
        <div className="header">
            <div className="header__left">
                <Link href="/"><img
                    className="header_logo"
                    src="../images/logo-top.svg"
                    alt=""
                /></Link>
            </div>
            <div className="header__center">
                <HeaderLocation />
                <div className="header_menu">
                    <a className="header_menu_link" onClick={() => heandleToMenu()}>
                        Меню
                    </a>
                    <a className="header_menu_link" href="">
                        Новинки и акции
                    </a>
                    <a className="header_menu_link" onClick={()=> dispatch(setMapModal(true))}>
                        Старик Хинкалыч на карте
                    </a>
                    <a className="header_menu_link_franchise" href={'https://франшиза.хинкалыч.рф/'} target={'_blank'} rel="noreferrer">
                        Франшиза
                    </a>
                </div>
            </div>
            <div className="header__right">
                <CartSmall />
            </div>
        </div>
    );
};
export default Header;
