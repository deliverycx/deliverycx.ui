import { useContext } from "react"
import { PointsContext } from "./Points"
import cn from "classnames";
import { workTimeHelp } from "application/helpers/workTime";
import { CART_CHOICE } from "application/contstans/cart.const";
import PointWorkTime from "./PointWorkTime";
import PointStatus from "./PointStatus";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { ORG_STATUS } from "application/contstans/const.orgstatus";

/* eslint-disable @typescript-eslint/no-var-requires */
const PopupPoint = () => {
	const pointstatus = adapterSelector.useSelectors(selector => selector.pointstatus)
  const useCasePoints = useContext(PointsContext)
  const { addresses, statePoint, recvisites } = useCasePoints.data
  const { selectPointHandler, buttonClickHandler, SlidePointsHandler, recvisitesHandler } = useCasePoints.handlers

  const address = addresses && addresses[statePoint.slideIndex]
  const selectAdressCN = cn("welcome__select-adress", { opened: statePoint.isOpen });
	
	const statusopenCN = address && cn("welcome__select-adress opened", { stausopen: pointstatus.organizationStatus === ORG_STATUS.OPEN });
	const nodeliveCN = address && cn("btn welcome__select-adress__btn", { nodelivebtn: pointstatus.organizationStatus === ORG_STATUS.NODELIVERY });

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
                          
													<PointWorkTime worktime={address.workTime} adress={address.address} />
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
                              (recvisites && Object.keys(recvisites).length !== 0) &&
                              <div className="recvisites" onClick={() => recvisitesHandler(true)}>Реквизиты компании</div>
                          }

													<PointStatus point={address} />

                          <button
                              className={nodeliveCN}
                              onClick={() => selectPointHandler(address)}
															disabled={pointstatus.organizationStatus === ORG_STATUS.OPEN || pointstatus.organizationStatus === ORG_STATUS.NOWORK && true}
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
