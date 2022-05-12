import React from "react";
import ReserveModalRows from "./ReserveModalRows";

const ReserveModal = ({onClose}:any) => {
    return (
        //cart_modals
        <div className="reserve">
            <div className="reserve-container">
                <div className="close" onClick={onClose}>
                    <img src="/images/icon/close.png" alt="" />
                </div>
                <div className="modals_title"><span>Забронировать</span> стол</div>
                <ReserveModalRows empty={() => onClose()} />
                <a className="cart__order-btn btn" href="/checkout">Отправить</a>
                <div>
                    Нажимая кнопку «Отправить» вы соглашаетесь
                    с условиями Пользовательского соглашения
                </div>
            </div>
        </div>
    )
}

export default ReserveModal;
