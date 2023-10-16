/* eslint-disable no-constant-condition */
import React, {FC, useContext, useEffect, useRef} from 'react';

import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import iconPerson from "assets/images/icons/person.png";
import iconLocation from "assets/images/icons/location.png";
import iconListAlt from "assets/images/icons/list_alt.png";
import iconStoreGray from "assets/images/icons/store_gray.png";
import iconTableRestaurantGray from "assets/images/icons/table_restaurant_gray.png";
import iconThumbUp from "assets/images/icons/thumb_up.png";
import iconThumbDown from "assets/images/icons/thumb_down.png";
import iconWork from "assets/images/icons/work.png";
import iconHandshake from "assets/images/icons/handshake.png";
import iconChat from "assets/images/icons/chat.png";
import iconClose from "assets/images/icons/close.png";
import iconVk from "assets/images/icons/vk.png";
import iconTg from "assets/images/icons/telegram.png";
import { ROUTE_APP } from 'application/contstans/route.const';

const MainMenu:FC<{closeMenu:any}> = observer(({closeMenu}) => {
    
    const menuRef = useRef<any>()
    useEffect(() => {
        setTimeout(() => {
            menuRef.current.classList.add('opened')
        }, 50)
    }, [menuRef])
    const handleClose = () => {
        menuRef.current.classList.remove('opened')
        setTimeout(() => {
            closeMenu(false)
        }, 300)
    }
    const handleWrapperClick = (e:any) => {
        if (e.target.classList.contains('menu-wrapper')) {
            menuRef.current.classList.remove('opened')
            setTimeout(() => {
                closeMenu(false)
            }, 300)
        }

    }
    return (
        <div className="menu-wrapper" onClick={(e) => handleWrapperClick(e)}>
            <div ref={menuRef} className="menu">
                <div className="menu-header">
                    <button onClick={handleClose}>
                        <img src={iconClose} alt=""/>
                    </button>
                </div>
                <div className="menu-menu">
                    {true ? (
                        <NavLink to={ROUTE_APP.AUTH.REGISTER}>
                            <img src={iconPerson} alt=""/>
                            Профиль
                        </NavLink>
                    ):(
                        <NavLink to="">
                            <img src={iconPerson} alt=""/>
                            Профиль
                        </NavLink>
                    )}
                    <NavLink to="">
                        <img src={iconLocation} alt=""/>
                        Адреса доставки
                    </NavLink>
                    <NavLink to="">
                        <img src={iconListAlt} alt=""/>
                        Заказы
                    </NavLink>
                    <NavLink to="">
                        <img src={iconStoreGray} alt=""/>
                        <span>
                            Симферополь
                            <span>ул. Турецкая, 25</span>
                        </span>
                    </NavLink>
                    <NavLink to="">
                        <img src={iconTableRestaurantGray} alt=""/>
                        Забронировать столик
                    </NavLink>
                    <NavLink to="">
                        <img src={iconThumbUp} alt=""/>
                        Похвалить
                    </NavLink>
                    <NavLink to="">
                        <img src={iconThumbDown} alt=""/>
                        Пожаловаться
                    </NavLink>
                    <NavLink to="">
                        <img src={iconWork} alt=""/>
                        Вакансии
                    </NavLink>
                    <NavLink to="">
                        <img src={iconHandshake} alt=""/>
                        Франшиза
                    </NavLink>
                    <NavLink to="">
                        <img src={iconChat} alt=""/>
                        Связаться с нами
                    </NavLink>
                </div>
                <div className="menu-social">
                    <NavLink to="https://vk.com/starikhinkalych" target="_blank">
                        <img src={iconVk} alt=""/>
                    </NavLink>
                    <NavLink to="https://t.me/s/starikhinkalych" target="_blank">
                        <img src={iconTg} alt=""/>
                    </NavLink>
                </div>
                <NavLink to="https://доставка.хинкалыч.рф/" className="menu-full-link">
                    Полная версия сайта
                </NavLink>
            </div>
        </div>
    );
});

export default MainMenu;