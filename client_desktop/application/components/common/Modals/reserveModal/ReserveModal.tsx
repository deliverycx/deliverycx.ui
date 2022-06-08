import React from "react";
import ReserveModalRows from "./ReserveModalRows";

const ReserveModal = ({onClose, reserveProps}:any) => {
    return (
        //cart_modals
        <div className="reserve">
            <div className="reserve-container">
                <div className="close" onClick={onClose}>
                    <img src="/images/icon/close.png" alt="" />
                </div>
                <div className="modals_title"><span>Забронировать</span> стол</div>
                <ReserveModalRows reserveProps={reserveProps}/>
            </div>
        </div>
    )
}

export default ReserveModal;
