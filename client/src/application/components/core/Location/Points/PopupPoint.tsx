import { useContext } from "react"
import { PointsContext } from "./Points"
import cn from "classnames";
import { workTimeHelp } from "application/helpers/workTime";
import { CART_CHOICE } from "application/contstans/cart.const";
import PointWorkTime from "./PointWorkTime";

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
                          
													<PointWorkTime worktime={address.workTime} />
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
                              address.delivMetod === "PICKUP" &&
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

                          {
                              (recvisites && Object.keys(recvisites).length !== 0) &&
                              <div className="recvisites" onClick={() => recvisitesHandler(true)}>Реквизиты компании</div>
                          }
                          {workTimeHelp(address.workTime) &&
                              <div className="point-closed-container">
                                  <div className="text-bold">Наша хинкальная пока закрыта.<br /> Оформить заказ нельзя.</div>
                                  <div className="text-secondary">Сейчас вы можете ознакомится с нашим<br />
                                       меню и почитать новости
                                  </div>
                              </div>
                          }
                          {
                              address.delivMetod === CART_CHOICE.NODELIVERY &&
                              <div className="point-closed-container">
                                  <div className="text-bold">Онлайн заказ недоступен</div>
                                  <div className="text-secondary">Приносим извинения за неудобства.<br />
                                      Сейчас вы можете ознакомиться с меню и узнать об акциях и новинках.
                                  </div>

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
