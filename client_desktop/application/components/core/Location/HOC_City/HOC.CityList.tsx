import { ICity } from "@types"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useCitiList } from "domain/use-case/useCaseLocation"
import cn from "classnames";
import { useContext } from "react";
import { LocationPointsContext } from "../LocationLayout";

const CityList = () => {
  const useCaseLocationPoints = useContext(LocationPointsContext);
	const {selectCity} = useCaseLocationPoints.data
  const { handlerCloseModal,setShow,handleSelectCity } = useCaseLocationPoints.handlers;

  const useCaseCitiList = adapterComponentUseCase(useCitiList,setShow)
  const { cities } = useCaseCitiList.data
  const { setSerchCiti, hadleCitySerch } = useCaseCitiList.handlers
  const { isLoading } = useCaseCitiList.status
	let sortedCities;
	

	if (cities) sortedCities = cities.slice().sort((a: { name: string; }, b: { name: string; }) => a.name > b.name ? 1 : -1);

  return (
		<div className="location_city">
			<div className="location_city-container">
				
				<div className="modals-top_box">
					<div className="modals_title city-list">Выберите <span>город</span></div>
				</div>
				<div className="search_city city-list">
					<input type="text" name="" id="" placeholder="Поиск города" onChange={(e) => setSerchCiti(e.target.value)} />
					<button></button>
				</div>
				<div className="you_city__points city-list">
					<ul className="points-list city-list">
						{
							!isLoading && sortedCities && sortedCities.slice().sort().map((city: ICity) => {
								const CN = cn("welcome__city", { active: city.id === selectCity.id }); //city.name === selectedCity?.name
								console.log(city.id == selectCity.id);
								if (!city.isHidden) {
									return <li key={city.id} onClick={() => handleSelectCity(city)} className={CN}>{city.name}</li>;
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
