import { adapterComponentUseCase } from "adapters/adapterComponents"
import { usePoints } from "domain/use-case/useCaseLocation"
import { IPoint } from '@types';
import cn from "classnames";
import { useContext } from "react";
import { LocationPointsContext } from "../LocationLayout";
import { CART_CHOICE } from "application/contstans/cart.const";


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
                    const CN = cn("welcome__city", { active: points.address === point.address, disablepoint:points.delivMetod === CART_CHOICE.OPEN }) //city.name === selectedCity?.name
                    return <li key={points.id} onClick={() => handlerPoint(points)} className={CN}>
                      {points.address}
                      {	points.delivMetod === CART_CHOICE.PICKUP 
													? <span className="onlypickup_small">только самовывоз</span> :
												points.delivMetod === CART_CHOICE.NODELIVERY 
													? <span className="onlypickup_small">онлайн заказ недоступен</span> :
												points.delivMetod === CART_CHOICE.OPEN 
													? <span className="onlypickup_small">скоро открытие</span> :	
													<span className="onlypickup_small">самовывоз и доставка</span>
											}
                      
                    </li>
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
