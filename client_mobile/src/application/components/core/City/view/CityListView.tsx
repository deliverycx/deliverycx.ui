import { ROUTE_APP } from "application/contstans/route.const"
import { observer } from "mobx-react-lite"
import { cityModel } from "modules/CityModule/city.module"
import { CityDTO } from "modules/CityModule/interfaces/city.dto"
import { ICity } from "modules/CityModule/interfaces/city.type"
import { FC } from "react"
import { Link } from "react-router-dom"

type IProps = {
	submitCity: (city: ICity) => void
	city: ICity
}

const CityListView: FC<IProps> = ({ submitCity, city }) => {
	const { selectCity } = cityModel


	return (
		<>


			<Link to={ROUTE_APP.POINT} relative="path" onClick={() => submitCity(city)}>
				{city.cityname} {city.countOrganization > 1 && <>({city.countOrganization})</>}
			</Link>
		</>
	)
}
export default observer(CityListView)