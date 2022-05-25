/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import TodayIcon from '@mui/icons-material/Today';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReplayIcon from '@mui/icons-material/Replay';
import ErrorIcon from '@mui/icons-material/Error';

const OrdersHistory = () => {
    const iconsSettings = {
        color: "#BDBDBD",
        width: '13px'
    }

    return (
        <>
            <div className="history-header">
                <a href="#"><img
                    src={require("assets/img/profile-pictures/back-arrow.png").default}
                    alt="back arrow" />
                </a>
                <div className="history-header-title">
                    <span>История</span> заказов
                </div>
            </div>
            <div className="orders">
                <div className="order-item">
                    <div className="order-info">
                        <div className="order-info-row">
                            <ListAltIcon sx={iconsSettings}/>
                            <span className="order-info-title">Номер заказа:</span>
                        </div>
                        <div className="order-info-row">
                            <TodayIcon sx={iconsSettings}/>
                            <span className="order-info-title">Дата заказа:</span>
                        </div>
                        <div className="order-info-row">
                            <RestaurantIcon sx={iconsSettings}/>
                            <span className="order-info-title">Статус:</span>
                        </div>
                        <div className="order-info-row">
                            <ShoppingCartIcon sx={iconsSettings}/>
                            <span className="order-info-title">Сумма заказа:</span>
                        </div>
                    </div>
                    <div className="order-data">
                        <div className="order-info-row">
                            <span className="order-data-item">13467946</span>
                        </div>
                        <div className="order-info-row">
                            <span className="order-data-item">22.02.2022</span>
                        </div>
                        <div className="order-info-row">
                            <span className="order-data-item status">Выполнен</span>
                        </div>
                        <div className="order-info-row">
                            <span className="order-data-item summ">2 564 ₽</span>
                        </div>
                    </div>
                    <div className="order-buttons">
                        <div className="repeat-btn">
                            <ReplayIcon sx={{color: '#fff'}}/>
                        </div>
                        <div className="info-btn">
                            <ErrorIcon sx={{color: '#BDBDBD'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrdersHistory;
