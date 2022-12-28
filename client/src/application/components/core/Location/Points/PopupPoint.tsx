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
	
	const statusopenCN = address && cn("welcome__select-adress opened", { stausopen: address.delivMetod === CART_CHOICE.OPEN });
	const nodeliveCN = address && cn("btn welcome__select-adress__btn", { nodelivebtn: address.delivMetod === CART_CHOICE.NODELIVERY });

	
  return (
      <>
          <button onClick={() => buttonClickHandler()} className={selectAdressCN}>
              Выберите заведение
          </button>
          {
              statePoint.isOpen && address && (
								
                  <div className={statusopenCN}>
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
                          
													<PointWorkTime worktime={address.workTime} adress={address} />
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
                              address.delivMetod === CART_CHOICE.PICKUP &&
                              <div className="welcome__select-adress__info onlypickup">
                                  <img
                                      src={require("assets/i/bag-red.svg").default}
                                      alt="Только самовывоз"
                                  />
                                  <span>Только самовывоз</span>
                              </div>
                          }
													{
														
														address.delivMetod === CART_CHOICE.OPEN &&
                              <div className="welcome__select-adress__info onlyopen">
                                  <img
                                      src={require("assets/i/cloce.svg").default}
                                      alt="Скоро открытие"
                                  />
                                  <span>Скоро открытие</span>
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
                          {workTimeHelp(address.workTime,address.guid) 
													
													&&
                              <div className="point-closed-container">
                                  <div className="text-bold">Наша хинкальная пока закрыта.<br /> Оформить заказ нельзя.</div>
                                  <div className="text-secondary">Сейчас вы можете ознакомится с нашим<br />
                                       меню и почитать новости
                                  </div>
                              </div>
                          }

													
                          {
                              address.delivMetod === CART_CHOICE.NODELIVERY && !workTimeHelp(address.workTime) &&
                              <div className="point-closed-container">
                                  <div className="text-bold">Хинкальная только открылась и готовится<br /> к подключению онлайн-заказов </div>
                                  <div className="text-secondary">Сейчас вы можете ознакомиться с нашим меню,<br /> просмотреть новости и узнать об актуальных акциях
                                  </div>

                              </div>
                          }
													{
														
														address.delivMetod === CART_CHOICE.OPEN || address.delivMetod === CART_CHOICE.NOWORK && ! workTimeHelp(address.workTime) &&
														<div className="point-closed-container">
																<div className="text-bold">Онлайн-заказ в данной хинкальной недоступен</div>
																<div className="text-secondary">Приносим извинения за неудобства.</div>

														</div>
													}
                          <button
                              className={nodeliveCN}
                              onClick={() => selectPointHandler(address)}
															disabled={address.delivMetod === CART_CHOICE.OPEN || address.delivMetod === CART_CHOICE.NOWORK && true}
                          >
                              Выбрать
                          </button>
                      </div>
                  </div>
              )
          }
      </>
  )
}
export default PopupPoint
