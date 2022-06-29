import React from "react";
import ReserveModalRows from "./ReserveModalRows";

const ReserveModal = ({onClose, reserveProps}:any) => {
    return (
        //cart_modals
        <div className="reserve">
            <div className="reserve-container">
                <div className="close" onClick={onClose}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_329_8395)">
                      <path d="M0 0L11.9991 12M12 0L0.00090279 12" stroke="#ABABAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_329_8395">
                        <rect width="12" height="12" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="modals_title">Забронировать стол</div>
                <ReserveModalRows reserveProps={reserveProps}/>
            </div>
        </div>
    )
}

export default ReserveModal;
