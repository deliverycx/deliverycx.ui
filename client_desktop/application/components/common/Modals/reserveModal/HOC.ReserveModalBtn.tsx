import React, { FC, useState } from "react";
import Modals from "../Modals";
import ReserveModal from "./ReserveModal";
import SuccessReserveModal from "./SuccessReserveModal";
import { adapterComponentUseCase } from "../../../../../adapters/adapterComponents";
import { useReserveModal } from "../../../../../domain/use-case/useCaseWebhook";

type IProps = {
	isModalOpen:boolean
	setIsModalOpen:any
}

const ReserveModalBtnContainer:FC<IProps> = ({isModalOpen,setIsModalOpen}) => {

    const useCaseReserve = adapterComponentUseCase(useReserveModal)
    const {formik,point,ReducerActionTypePoints,stateReserve, onCloseSuccessHandler} = useCaseReserve.data
    const {dispatchReserve} = useCaseReserve.handlers

    const reserveProps = {
        formik,point,ReducerActionTypePoints,stateReserve,dispatchReserve
    }

    const modalsCloseHandler = () => {
        setIsModalOpen(false)
        onCloseSuccessHandler()
    }



    return (
        <>
            
            {
                isModalOpen &&
                <Modals onClose={() => modalsCloseHandler()}>
                    <ReserveModal reserveProps={reserveProps} onClose={() => setIsModalOpen(false)} />
                </Modals>
            }
            {stateReserve.success &&
                <Modals>
                    <SuccessReserveModal onCloseSuccessHandler={modalsCloseHandler} />
                </Modals>
            }
        </>
    );
};

export default ReserveModalBtnContainer;
