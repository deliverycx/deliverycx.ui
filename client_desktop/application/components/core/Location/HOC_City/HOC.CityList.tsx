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
	let sortedCities;

	if (cities) sortedCities = cities.slice().sort((a: { name: string; }, b: { name: string; }) => a.name > b.name ? 1 : -1);

  return (
		<div className="location_city">
			<div className="location_city-container">
				<div className="close" onClick={handlerCloseModal}>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0_329_8395)">
							<path d="M0 0L11.9991 12M12 0L0.00090279 12" stroke="#ABABAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</g>
						<defs>
							<clipPath id="clip0_329_8395">
								<rect width="12" height="12" fill="white"/>
							</clipPath>
						</defs>
					</svg>
				</div>
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
