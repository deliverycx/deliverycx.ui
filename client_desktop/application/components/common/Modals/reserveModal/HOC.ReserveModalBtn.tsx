import React, { useState } from "react";
import CartSmallButton from "../../../core/Cart/HOC_CartSmall/view/CartSmallButton";
import Modals from "../Modals";
import CartSmallList from "../../../core/Cart/HOC_CartSmall/view/CartSmallList";
import ReserveModal from "./ReserveModal";
import { adapterComponentUseCase } from "../../../../../adapters/adapterComponents";
import { useCartSmall } from "../../../../../domain/use-case/useCaseCart";

const ReserveModalBtnContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button className="reserve-btn" onClick={()=> setIsModalOpen(true)}>
                Забронировать стол
            </button>
            {/*<CartSmallButton modal={reserveModalHandler} />*/}
            {
                isModalOpen &&
                <Modals onClose={() => setIsModalOpen(false)}>
                    <ReserveModal onClose={() => setIsModalOpen(false)} />
                </Modals>
            }
        </>
    )
}

export default ReserveModalBtnContainer;
