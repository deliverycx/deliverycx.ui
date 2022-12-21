import { adapterComponentUseCase } from "adapters/adapterComponents"
import { usePoints } from "domain/use-case/useCaseLocation"
import { IPoint } from '@types';
import cn from "classnames";
import { useContext } from "react";
import { LocationPointsContext } from "../LocationLayout";
import { CART_CHOICE } from "application/contstans/cart.const";
import PointStatus from "./view/PointStatus";


const Points = () => {
  const useCaseLocationPoints = useContext(LocationPointsContext);
	const {selectCity} = useCaseLocationPoints.data
  const { handlerCloseModal,handlerMapModal,handleSelectOrganitztion,setShow } = useCaseLocationPoints.handlers;

  const useCasePoints = adapterComponentUseCase(usePoints,{selectCity,handleSelectOrganitztion})
  const { addresses,point } = useCasePoints.data
  const {handlerPoint} = useCasePoints.handlers
  const { isLoading } = useCasePoints.status

  return (
    <div className="location_city">
  		<div className="location_city-container">
  			<div className="modals-top_box">
  				<div className="modals_title">Выберите <span>хинкальную</span></div>
          <div className="tomap" onClick={() => {
            handlerMapModal(true)
            handlerCloseModal()
          }}>Посмотреть на карте</div>
  			</div>
  			<div className="you_city__points choose-hink">
  				<ul className="points-list choose-hink">
          {
              !isLoading && addresses && addresses.map((points: IPoint) => {
                  if (!points.isHidden) {
                    
                    return <PointStatus key={points.id} handler={handlerPoint} selectpoint={point} organization={points} />
                  }
                })
            }
  				</ul>
        </div>
        <div className="you_city">
  				<div className="you_city-adress">
  					<span>Ваш город:</span>
  					<div className="you_city-adress--city">{selectCity.name}</div>
  				</div>
  				<div className="you_city-change" onClick={()=> setShow(true)}>Выбрать другой</div>
  			</div>
  		</div>
	  </div>
  )
}
export default Points
