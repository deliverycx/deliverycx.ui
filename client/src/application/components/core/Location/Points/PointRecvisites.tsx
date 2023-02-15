import { useContext } from "react";
import { PointsContext } from "./Points";

const PointRecvisites = () => {
    const useCasePoints = useContext(PointsContext);
    const { statePoint, recvisites } = useCasePoints.data;
    const { recvisitesHandler } = useCasePoints.handlers;

    return (
        <div className="recvisites_container">
            <div className="recvisites_box">
                <div
                    className="recvisites_box--close"
                    onClick={() => recvisitesHandler(false)}
                ></div>
                <h3 className="recvisites_box-title">ИП Исмайлов Ф.М.</h3>
                <div className="recvisites_box-ur">Юридический адрес:</div>
                <div className="recvisites_box-content">
                    <span>ОГРНИП 321920000012976</span>
                    <span>ИНН 920450755908</span>
                </div>
								<br />
								<h3 className="recvisites_box-title">ООО «Хинкалыч»</h3>
                <div className="recvisites_box-ur">Юридический адрес:</div>
                <div className="recvisites_box-content">
                    <span>ОГРН 1169102054450</span>
                    <span>ИНН 9102204024</span>
                </div>
            </div>
        </div>
    );
};
export default PointRecvisites;
