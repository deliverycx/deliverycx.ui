import React from "react";
import { adapterComponentUseCase } from "../../../../../adapters/adapterComponents";
import { useReserveModal } from "../../../../../domain/use-case/useCaseWebhook";

const SuccessReserveModal = ({onCloseReserveModal}:any) => {
    const useCaseReserve = adapterComponentUseCase(useReserveModal)
    const {onCloseSuccessHandler} = useCaseReserve.data

    return (
        <div className="ded-popup">
            <div className="popup-container">
                <div className="close-btn" onClick={() =>{
                    console.log('closws');
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
