import { adapterComponentUseCase, TadapterCaseCallback } from "adapters/adapterComponents"
import Modals from "application/components/common/Modals/Modals"
import NotificationModal from "application/components/common/Modals/NotificationModal"
import { useLocations } from "domain/use-case/useCaseLocation"
import React from "react"
import CityList from "./HOC_City/HOC.CityList"
import NotificatCity from "./HOC_City/view/NotificatCity"
import Points from "./HOC_Points/HOC.Points"
import PointsMap from "./HOC_Points/HOC.PointsMap"
import PointWorkTimeModal from "./HOC_Points/view/PointWorkTimeModal"

export const LocationPointsContext = React.createContext<TadapterCaseCallback>({
  data: {},
  handlers: {},
  status:{}
});
const LocationLayout = () => {
  const useCaseLocation = adapterComponentUseCase(useLocations)
  const { modal,showCiti,modalMap,youSity,workOrg } = useCaseLocation.data
  const {handlerCloseModal,handlerCloseMapModal,setYouSyty} = useCaseLocation.handlers

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
		</LocationPointsContext.Provider>
		</>
  )
}
export default LocationLayout