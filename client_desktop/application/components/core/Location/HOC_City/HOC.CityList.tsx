import { ICity } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useCitiList } from "domain/use-case/useCaseLocation"
import cn from "classnames";
import { useContext } from "react";
import { LocationPointsContext } from "../LocationLayout";

const CityList = () => {
  const useCaseLocationPoints = useContext(LocationPointsContext);
  const { handlerCloseModal,setShow } = useCaseLocationPoints.handlers;
  const useCaseCitiList = adapterComponentUseCase(useCitiList,setShow)
  const { cities,selectedCity } = useCaseCitiList.data
  const { selectCiti, setSerchCiti, hadleCitySerch } = useCaseCitiList.handlers
  const { isLoading } = useCaseCitiList.status

  return (
		<div className="location_city">
			<div className="location_city-container">
				<div className="close" onClick={handlerCloseModal}>
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1L12.9991 13M13 1L1.0009 13" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</div>
				<div className="modals-top_box">
					<div className="modals_title">Выберите <span>город</span></div>
				</div>
				<div className="search_city">
					<input type="text" name="" id="" placeholder="Поиск города" onChange={(e) => setSerchCiti(e.target.value)} />
					<button></button>
				</div>

				<div className="you_city__points">
					<ul className="points-list">
						{
							!isLoading && cities && cities.map((city: ICity) => {
								const CN = cn("welcome__city", { active: city.name === selectedCity.name }); //city.name === selectedCity?.name
								if (!city.isHidden) {
									return <li key={city.id} onClick={() => selectCiti(city)} className={CN}>{city.name}</li>;
								}
							})
						}
					</ul>
					{
						!isLoading && cities && cities.length === 0 && <img className="nocity" src="/images/icon/nocity.png" />
					}
				</div>
			</div>
		</div>
  )
}
export default CityList
