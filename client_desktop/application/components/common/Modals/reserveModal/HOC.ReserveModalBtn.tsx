import React, { useState } from "react";
import Modals from "../Modals";
import ReserveModal from "./ReserveModal";

const ReserveModalBtnContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button className="reserve-btn" onClick={() => setIsModalOpen(true)}>
                Забронировать стол
            </button>
            {
                isModalOpen &&
                <Modals onClose={() => setIsModalOpen(false)}>
                    <ReserveModal onClose={() => setIsModalOpen(false)} />
                </Modals>
            }
        </>
    );
};

export default ReserveModalBtnContainer;
