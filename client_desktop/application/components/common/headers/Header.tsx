/* eslint-disable react/jsx-no-duplicate-props */
import CartSmall from "application/components/core/Cart/HOC_CartSmall/HOC.CartSmall";
import { useDispatch, useSelector } from "react-redux";
import { setMapModal, setModal } from "servises/redux/slice/locationSlice";
import HeaderLocation from "./HeaderLocation";
import Link from 'next/link'
import { checkPoint } from "application/helpers/checkPoint";
import { useCallback, useState } from "react";
import { useRouter } from 'next/router'
import { ROUTE_APP } from 'application/contstans/route.const';
import { RootState } from "../../../../servises/redux/createStore";
import cn from "classnames";
import ReserveModalBtnContainer from "../Modals/reserveModal/HOC.ReserveModalBtn";
import { adapterSelector } from "servises/redux/selectors/selectors";
import Modals from "../Modals/Modals";
import CounterHiModal from "../Modals/CounterHiModal";

/* eslint-disable react/no-unknown-property */
const Header = () => {
    const mapShowModal = useSelector((state: RootState) => state.location.locationMap);
		const point = adapterSelector.useSelectors(selector => selector.point)
		const [isModalOpen, setIsModalOpen] = useState(false)

		
    const mapColorCN = cn("header_menu_link", {hinkRedColor: mapShowModal});
    const menuLinkColor = window.location.href.includes('menu');
    const menuLinkWithColorCN = cn("header_menu_link", {hinkRedColor: menuLinkColor});
    const dispatch = useDispatch()

  const router = useRouter()

  const heandleToMenu = useCallback(() => {
    if (checkPoint(false)) {
      router.push(ROUTE_APP.MENU)
    } else {
      dispatch(setModal(true))
    }
  },[router.asPath])


	const handleClickMap = () =>{
		if (checkPoint(false)){
			dispatch(setMapModal(true))
		}else{
			dispatch(setModal(true))
		}
		
	}

	const rend = () =>{
		window.location.href = process.env.NEXT_PUBLIC_REDIRECT as string
		
	}

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
                <div className="header__center__location">
                    {
											checkPoint(false) &&
											<>
												<HeaderLocation />
												{
													/*
													<button className="reserve-btn" onClick={() => setIsModalOpen(true)}>
						                Счетчик хинкали
						            	</button>
													*/
												}
												{
													isModalOpen &&
													<Modals onClose={() => setIsModalOpen(false)}>
														<CounterHiModal isModalOpen={isModalOpen} setIsModalOpen={() => setIsModalOpen(false)}/>
													</Modals>
													
												}
												
											</>
										}

                </div>
                <div className="header_menu">
                    <a className={menuLinkWithColorCN} onClick={() => heandleToMenu()}>
                        Меню
                    </a>
                    <a className="header_menu_link" href="http://starikkhinkalich.ru/" target="_blank" rel="noreferrer" >
										Новости и акции
                    </a>
                    <a className={mapColorCN} onClick={()=> handleClickMap()}>
                        Старик Хинкалыч на карте
                    </a>
                    <a className="header_menu_link" href={'https://франшиза.хинкалыч.рф/'} target={'_blank'} rel="noreferrer">
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
