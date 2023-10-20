/* eslint-disable @typescript-eslint/no-var-requires */
import { ROUTE_APP } from "application/contstans/route.const"
import { observer } from "mobx-react-lite"
import { cityModel } from "modules/CityModule/city.module"
import { CityDTO } from "modules/CityModule/interfaces/city.dto"
import { ICity } from "modules/CityModule/interfaces/city.type"
import { FC } from "react"
import { Link } from "react-router-dom"
import selectCityIcon from "assets/images/icons/check_circle.svg"

type IProps = {
	submitCity: (city: ICity) => void
	city: ICity
}

const CityListView: FC<IProps> = ({ submitCity, city }) => {
	const { selectCity } = cityModel


	return (
		<div className="item__city">
			<section>
				<Link to={ROUTE_APP.POINT} relative="path" onClick={() => submitCity(city)}>
				{city.cityname}
			</Link>
			<div className="city__institutes">{city.countOrganization > 1 && <>{city.countOrganization}</>}</div>
			</section>
			
			{
									selectCity?.id === city.id &&
									<div className="item__check">
										<img src={selectCityIcon} alt="" />
									</div>
								}
		</div>
	)
}
export default observer(CityListView)