import React from "react";

const SuccessReserveModal = ({onCloseSuccessHandler}:any) => {

    return (
        <div className="ded-popup">
            <div className="popup-container">
                <div className="close-btn" onClick={() =>{
                    onCloseSuccessHandler()
                }}></div>
                <div className="popup-check"></div>
                <div className="popup-info">
                    <div className="sent">Ваша заявка <span>отправлена</span></div>
                    <div className="admin">с вами свяжется администратор</div>
                </div>
                <div className="ded"></div>
            </div>
        </div>
    )
}

export default SuccessReserveModal;
