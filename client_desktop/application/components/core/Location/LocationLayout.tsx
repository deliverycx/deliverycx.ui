import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import Modals from "application/components/common/Modals/Modals"
import NotificationModal from "application/components/common/Modals/NotificationModal"
import { useLocations } from "domain/use-case/useCaseLocation"
import React, { useState } from "react"
import CityList from "./HOC_City/HOC.CityList"
import NotificatCity from "./HOC_City/view/NotificatCity"
import Points from "./HOC_Points/HOC.Points"
import PointsMap from "./HOC_Points/HOC.PointsMap"
import PointDisplay from "./HOC_Points/view/PointDisplay"
import PointWorkTimeModal from "./HOC_Points/view/PointWorkTimeModal"
import OnliPUCKUPModal from "./HOC_Points/modals/OnliPUCKUPModal"
import { delivertyTime, workTimeHelp } from "application/helpers/workTime"
import { DILIVERY_TIME_STATUS } from "application/contstans/const.orgstatus"
import NoDeliveryModal from "./HOC_Points/modals/NoDeliveryModal"

export const LocationPointsContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const LocationLayout = () => {
  const useCaseLocation = adapterComponentUseCase(useLocations)
  const { modal,showCiti,modalMap,youSity,workOrg,displayOrg } = useCaseLocation.data
  const {handlerCloseModal,handlerCloseMapModal,setYouSyty,setDisplayOrg} = useCaseLocation.handlers

	const [onlipuckup, setonlipickiup] = useState(true)
	const [nodelivery, setnodelivery] = useState(true)

	const time = delivertyTime()

  return (
		<>
		<LocationPointsContext.Provider value={useCaseLocation}>
		{
         modal &&
				 <Modals>
					{
              showCiti
                ? <Modals><CityList /></Modals>
                : <Modals><Points /></Modals>
          }
				 </Modals>
     }
		 {
        modalMap &&
        <Modals onClose={handlerCloseMapModal}>
          <PointsMap />
        </Modals>

      }
			{
        youSity &&
        <Modals>
          <NotificatCity />
        </Modals>
      }
			{
				workOrg &&
				<Modals>
          <PointWorkTimeModal />
        </Modals>
			}
			{
				(time && time.status === DILIVERY_TIME_STATUS.ONLIPICKUP) && onlipuckup &&
				<Modals onClose={() => setonlipickiup(false)}>
          <OnliPUCKUPModal modal={() => setonlipickiup(false)} />
        </Modals>
			}
			{
				(time && time.status === DILIVERY_TIME_STATUS.NODELIVERY) && nodelivery && !workTimeHelp() &&
				<Modals onClose={() => setnodelivery(false)}>
          <NoDeliveryModal modal={() => setnodelivery(false)} />
        </Modals>
				
			}
			{
				displayOrg &&
				<Modals onClose={() => setDisplayOrg(false)}>
          <PointDisplay setter={setDisplayOrg} />
        </Modals>
			}
		</LocationPointsContext.Provider>
		</>
  )
}
export default LocationLayout