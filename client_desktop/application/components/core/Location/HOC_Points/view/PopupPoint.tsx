import { useContext, useEffect } from "react"

import cn from "classnames";
import { PointsContext } from "../HOC.PointsMap";


const PopupPoint = () => {
  const useCasePoints = useContext(PointsContext)
  const { addresses, statePoint, recvisites,selectedCity } = useCasePoints.data
  const { selectPointHandler, buttonClickHandler, SlidePointsHandler, recvisitesHandler } = useCasePoints.handlers

  const address = addresses && addresses[statePoint.slideIndex]
  const selectAdressCN = cn("welcome__select-adress", { opened: statePoint.isOpen });
  return (
    <>
    {
      address &&  (
          <div className="welcome__select-adress opened">
         <div className="location-container">
            <div className="welcome__select-adress__header ">
               <div className="prev" onClick={() => SlidePointsHandler("prev")}>
                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M6.53816 12.5L1 7L6.53816 1.5M1.76984 6.99999L13 6.99999" stroke="#ABABAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>

                <div className="welcome__select-adress__adress popup-point">
                  <div className="welcome__select-adress__city">г. {selectedCity.name}</div>
               </div>
               <div className="next" onClick={() => SlidePointsHandler("next")}>
                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M7.46184 12.5L13 7L7.46184 1.5M12.2302 6.99999L1 6.99999" stroke="#ABABAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
            </div>

              <div className="welcome__select-adress__info phone">
              <img
                  src="/images/i/clock.svg"
                  alt="Телефон заведения"
               />
               {address.workTime}
            </div>

            <div className="welcome__select-adress__info street">
               <img
                  src="/images/i/mark-red.svg"
                  alt="Телефон заведения"
               />
               {address.address}
            </div>
            <div className="welcome__select-adress__info phone">
               <img
                  src="/images/i/phone-green.svg"
                  alt="Телефон заведения"
               />
               <a href={`tel: ${address.phone}`}>
                  {address.phone}
               </a>
            </div>
           {address.delivMetod && <div className="deliv-method">Только самовывоз</div>}
           {!address.delivMetod && <div className="deliv-method">Самовывоз и доставка</div>}
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
