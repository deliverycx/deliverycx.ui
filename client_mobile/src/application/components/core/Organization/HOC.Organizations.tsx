/* eslint-disable @typescript-eslint/no-var-requires */
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { ROUTE_APP } from "application/contstans/route.const";
import { observer } from "mobx-react-lite"
import { cityModel } from "modules/CityModule/city.module";
import { Link } from "react-router-dom";
import { useOrganizationsViewModel } from "./Organization.viewModel";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import OrganizationMap from "./OrganizationMap/HOC.OrganizationMap";

import iconArrowBack from "assets/images/icons/arrow_back.png";
import HOCOrganizationCard from "./OrganizationCard/HOC.OrganizationCard";
import Draggable from "react-draggable";
import { useState } from 'react';
import HOCOrganizationFilters from "./OrganizationFilters/OrganizationFilters";
import HOCOrganizationSerch from "./OrganizationSerch/OrganizationSerch";



const HOCOrganizations = () => {

	const useCase = adapterComponentUseCase(useOrganizationsViewModel)
	const { city, organizations } = useCase.data
	const { handleBackCity } = useCase.handlers

	return (
		<div className="map">

			<HOCOrganizationCard />
			<div onClick={handleBackCity} className="map__topbar map__topbar__fixed">
				<div className="map__topbar-btn">
					<img src={iconArrowBack} alt="" />
				</div>
				<h3>{city.cityname}</h3>
			</div>


			{
				!organizations && <>load</>
			}
			<div className="map__map">
				{
					organizations &&
					<OrganizationMap organizations={organizations} />
				}
			</div>
			{
				organizations &&
				<div className="map__search">
					<HOCOrganizationSerch city={city} />
					<HOCOrganizationFilters city={city} />

				</div>
			}



		</div>

	)
}
export default observer(HOCOrganizations)