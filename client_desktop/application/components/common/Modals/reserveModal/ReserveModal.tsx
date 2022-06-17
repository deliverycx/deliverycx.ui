import React from "react";
import ReserveModalRows from "./ReserveModalRows";

const ReserveModal = ({onClose, reserveProps}:any) => {
    return (
        //cart_modals
        <div className="reserve">
            <div className="reserve-container">
                <div className="close" onClick={onClose}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L12.9991 13M13 1L1.0009 13" stroke="#ABABAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="modals_title">Забронировать стол</div>
                <ReserveModalRows reserveProps={reserveProps}/>
            </div>
        </div>
    )
}

export default ReserveModal;
