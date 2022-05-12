import React, { useState } from "react";
import CartSmallButton from "../../core/Cart/HOC_CartSmall/view/CartSmallButton";
import Modals from "../Modals/Modals";
import CartSmallList from "../../core/Cart/HOC_CartSmall/view/CartSmallList";
import ReserveModal from "./ReserveModal";
import { adapterComponentUseCase } from "../../../../adapters/adapterComponents";
import { useCartSmall } from "../../../../domain/use-case/useCaseCart";

const ReserveModalBtnContainer = () => {
    // const useCaseCartSmall = adapterComponentUseCase(useCartSmall)
    // const {showSmallCart} = useCaseCartSmall.data
    // const {setShowSmallCart} = useCaseCartSmall.handlers
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reserveModalHandler = (bool: boolean) => setIsModalOpen(bool);

    return (
        <>
            <button className="reserve-btn" onClick={()=> reserveModalHandler(!isModalOpen)}>
                Забронировать стол
            </button>
            {/*<CartSmallButton modal={reserveModalHandler} />*/}
            {
                isModalOpen &&
                <Modals onClose={() => reserveModalHandler(false)}>
                    <ReserveModal onClose={() => reserveModalHandler(false)} />
                </Modals>
            }
        </>
    )
}

export default ReserveModalBtnContainer;
