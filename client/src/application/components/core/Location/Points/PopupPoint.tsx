import { useContext, useEffect } from "react"
import { PointsContext } from "./Points"
import cn from "classnames";
import { workTimeHelp } from "application/helpers/workTime";

/* eslint-disable @typescript-eslint/no-var-requires */
const PopupPoint = () => {
  const useCasePoints = useContext(PointsContext)
  const { addresses, statePoint, recvisites } = useCasePoints.data
  const { selectPointHandler, buttonClickHandler, SlidePointsHandler, recvisitesHandler } = useCasePoints.handlers

  const address = addresses && addresses[statePoint.slideIndex]
  const selectAdressCN = cn("welcome__select-adress", { opened: statePoint.isOpen });

	console.log(address);
  return (
    <>
      <button onClick={() => buttonClickHandler()} className={selectAdressCN}>
           Выберите заведение
       </button>
    {
      statePoint.isOpen && address && (
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
                  address.delivMetod === 'PICKUP' &&
                  <div className="welcome__select-adress__info onlypickup">
                      <img
                          src={require("assets/i/bag-red.svg").default}
                          alt="Только самовывоз"
                      />
                      <span>Только самовывоз</span>
                  </div>
              }
              {
                  !address.delivMetod &&
                  <div className="welcome__select-adress__info onlypickup">
                      <img
                          src={require("assets/i/moto-red.svg").default}
                          alt="Доставка и самовывоз"
                      />
                      <span>Доставка и самовывоз</span>
                  </div>
              }
            {false &&
              <div className="point-closed">
                <div className="bold-text">
                  <div>Оформить заказ нельзя.<br/>
                  Хинкальная сейчас закрыта.</div>
                </div>
                <div className="small-text">
                  Приносим извинения за неудобства.<br/>
                  Сейчас вы можете ознакомиться с меню для будущих заказов и узнать об акциях и новинках.
                </div>
              </div>
            }
            {
              (recvisites && Object.keys(recvisites).length !== 0) &&
                <div className="recvisites" onClick={() => recvisitesHandler(true)}>Реквизиты компании</div>
            }

             {workTimeHelp() &&
                 <div className="point-closed-container">
                     <div className="text-bold">Оформить заказ нельзя.<br/> Хинкальная сейчас закрыта.</div>
                     <div className="text-secondary">Приносим извинения за неудобства.<br/>
                         Сейчас вы можете ознакомиться с меню для будущих заказов и узнать об акциях и новинках. </div>
                 </div>
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
