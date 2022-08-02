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
                    Привет!
                </div>
                <div className="attention-info">
                    Наша хинкальная сейчас закрыта.<br/>
                    Оформить заказ можно: <span>{selectedPoint.workTime}</span>
                </div>
                <div className="secondary-text">
                    А пока вы можете ознакомится с нашим меню<br/> и почитать новости
                </div>
                <div className="notification_worktime-buttons">
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/menu?worktime=true" className="btn-success">Посмотреть меню</a>
                </div>
        </div>
    );
};
export default PointWorkTimeModal;
