import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCitiList, useYouCiti } from "domain/use-case/useCaseLocation";
import { useContext } from "react";
import { LocationPointsContext } from "../../LocationLayout";

const PointWorkTimeModal = () => {
    const useCaseLocationPoints = useContext(LocationPointsContext);
    const {setShow,setYouSyty,handlerModal } = useCaseLocationPoints.handlers;

    const useCaseCitiList = adapterComponentUseCase(useYouCiti,setYouSyty)
    const { selectedCity } = useCaseCitiList.data

    return (
        <div className="notification_modal notification_work-time">
                <div className="attention">
                    Внимание!
                </div>
                <div className="attention-info">
                    Выбранная хинкальная сейчас закрыта.<br/>
                    Оформить заказ вы сможете: <span>9:00-21:30</span>
                </div>
                <div className="secondary-text">
                    Приносим извинения за неудобства. Сейчас вы можете ознакомиться с меню для будущих
                    заказов и узнать об акциях и новинках.
                </div>
                <div className="notification_worktime-buttons">
                    <span className="btn-secondary">Выбрать другую</span>
                    <span className="btn-success">Посмотреть меню</span>
                </div>
        </div>
    );
};
export default PointWorkTimeModal;
