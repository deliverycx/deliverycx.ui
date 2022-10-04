/* eslint-disable @typescript-eslint/no-var-requires */
import { ICity } from "@types";
import { adapterComponentUseCase } from "adapters/adapterComponents";
import axios from "axios";
import cn from "classnames";
import { useCitiList } from "domain/use-case/useCaseLocation";


const CityList = () => {
    const useCaseCitiList = adapterComponentUseCase(useCitiList)
    const { cities,selectedCity } = useCaseCitiList.data
    const { selectCiti, setSerchCiti } = useCaseCitiList.handlers
    const { isLoading } = useCaseCitiList.status
		
    return (
        <div data-testid="list" className="container welcome__city-list">
            <div className="welcome__search">
                <img src={require("assets/i/search-sm.svg").default} alt="Поиск города" />
                <input type="text" className="welcome__search__input" placeholder="Поиск" onChange={(e) => setSerchCiti(e.target.value)} />
            </div>
            {
                !isLoading && cities && cities.map((city:ICity) => {
                    const CN = cn("welcome__city", { selected: city.name === selectedCity.name}) //city.name === selectedCity?.name
										if(!city.isHidden){
											return <div key={city.id} data-testid="item" onClick={() => selectCiti(city)} className={CN}>
                        {city.name}
                    </div>
										}
                })
            }
        </div>
    )
}

export default CityList;
