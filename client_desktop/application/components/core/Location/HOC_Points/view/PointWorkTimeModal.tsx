import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCitiList, useHeaderLocations, useYouCiti } from "domain/use-case/useCaseLocation";
import { useContext } from "react";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { LocationPointsContext } from "../../LocationLayout";

const PointWorkTimeModal = () => {
		const useCaseLocationHeader = adapterComponentUseCase(useHeaderLocations);
		const { selectedPoint } = useCaseLocationHeader.data;
		const {handlerHeader } = useCaseLocationHeader.handlers;

		const useCaseLocationPoints = useContext(LocationPointsContext);
  	const {setWorkOrg } = useCaseLocationPoints.handlers;

    return (
        <div className="notification_modal notification_work-time">
                <div className="attention">
                    Внимание!
                </div>
                <div className="attention-info">
                    Выбранная хинкальная сейчас закрыта.<br/>
                    Оформить заказ вы сможете: <span>{selectedPoint.workTime}</span>
                </div>
                <div className="secondary-text">
                    Приносим извинения за неудобства. Сейчас вы можете ознакомиться с меню для будущих
                    заказов и узнать об акциях и новинках.
                </div>
                <div className="notification_worktime-buttons">
                    <span onClick={() => {
											handlerHeader('point')
											setWorkOrg(false)
										}} className="btn-secondary">Выбрать другую</span>
                    <a href="/menu?worktime=true" className="btn-success">Посмотреть меню</a>
                </div>
        </div>
    );
};
export default PointWorkTimeModal;
