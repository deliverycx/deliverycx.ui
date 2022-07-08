import { useContext, useEffect } from "react"
import { PointsContext } from "./Points"
import cn from "classnames";

/* eslint-disable @typescript-eslint/no-var-requires */
const PopupPoint = () => {
  const useCasePoints = useContext(PointsContext)
  const { addresses, statePoint, recvisites } = useCasePoints.data
  const { selectPointHandler, buttonClickHandler, SlidePointsHandler, recvisitesHandler } = useCasePoints.handlers

  const address = addresses && addresses[statePoint.slideIndex]
  const selectAdressCN = cn("welcome__select-adress", { opened: statePoint.isOpen });
  return (
    <>
      <button onClick={() => buttonClickHandler()} className={selectAdressCN}>
           Выберите заведение
       </button>
    {
      statePoint.isOpen && address &&  (
          <div className="welcome__select-adress opened">
         <div className="container">
            <div className="welcome__select-adress__header ">
               <div onClick={() => SlidePointsHandler("prev")}>
                  <img
                     src={require("assets/i/prev-btn.svg").default}
                     alt="Предыдущее заведенеие"
                  />
               </div>
               <div className="welcome__select-adress__adress">
                 {address.address}
               </div>
               <div onClick={() => SlidePointsHandler("next")}>
                  <img
                     src={require("assets/i/next-btn.svg").default}
                     alt="Следующее заведенеие"
                  />
               </div>
            </div>
            {/*<div className="welcome__select-adress__work-time">*/}
            {/*   {address.workTime}*/}
            {/*</div>*/}
            <div className="welcome__select-adress__info">
               <img
                  src={require("assets/i/clock.svg").default}
                  alt="Телефон заведения"
               />
               <span>{address.workTime}</span>
            </div>
            <div className="welcome__select-adress__info">
               <img
                  src={require("assets/i/phone-green.svg").default}
                  alt="Телефон заведения"
               />
               <a href={`tel: ${address.phone}`}>
                  {address.phone}
               </a>
            </div>
            {
              !address.delivMetod &&
              <div className="onlypickup">Только самовывоз</div>
            }
           {
             address.delivMetod &&
               <div className="onlypickup">Доставка и самовывоз</div>
           }
            {
              (recvisites && Object.keys(recvisites).length !== 0) && <div className="recvisites" onClick={()=>recvisitesHandler(true)}>Реквизиты компании</div>
            }
            <div
               className="btn welcome__select-adress__btn"
               onClick={() => selectPointHandler(address)}
            >
               Выбрать
            </div>
         </div>
      </div>
      )
    }
    </>
  )
}
export default PopupPoint
