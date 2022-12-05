/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ICity } from "@types";
import cn from "classnames";
import { useCitiList } from "domain/use-case/useCaseLocation";

declare var ym: any;

const CityList = () => {
    const useCaseCitiList = useCitiList()
    const { cities,selectedCity } = useCaseCitiList.data
    const { selectCiti, setSerchCiti } = useCaseCitiList.handlers
    const { isLoading } = useCaseCitiList.status

		let sortedCities;

		

		if (cities) sortedCities = cities.slice().sort((a: { name: string; }, b: { name: string; }) => a.name > b.name ? 1 : -1);

    return (
        <div className="container welcome__city-list">
            <div className="welcome__search">
                <img src={require("assets/i/search-sm.svg").default} alt="Поиск города" />
                <input type="text" className="welcome__search__input" placeholder="Поиск" onChange={(e) => setSerchCiti(e.target.value)} />
            </div>
            {
                !isLoading && sortedCities && sortedCities.slice().sort().map((city:ICity) => {
                    const CN = cn("welcome__city", { selected: city.name === selectedCity.name}) //city.name === selectedCity?.name
										if(!city.isHidden){
											return <div key={city.id} onClick={() => {
												selectCiti(city)
												ym(91135511,'reachGoal','target')
											}} className={CN}>
                        {city.name}
                    </div>
										}
                })
            }
        </div>
    )
}

export default CityList;
