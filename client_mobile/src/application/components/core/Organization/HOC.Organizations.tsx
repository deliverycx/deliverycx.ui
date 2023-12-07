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
import HOCOrganizationLists from "./OrganizationLists/HOC.OrganizationLists";
import Slider from "react-slick";



const HOCOrganizations = () => {

	const useCase = adapterComponentUseCase(useOrganizationsViewModel)
	const { city, organizations,pointCords,pointIndex } = useCase.data
	const { handleBackCity,selectPointPosition,setPointIndex,setPointCords } = useCase.handlers

	const [modalOpenedList, setIsOpenedList] = useState(false)

	const settings = {
		className: "center",
		centerMode: true,
		infinite: true,
		centerPadding: "25px",
		slidesToShow: 1,
		speed: 500,
		rows: 1,
		slidesPerRow: 1,
		
	};

	console.log(pointCords);

	return (
		<div className="map">

		
			{
				organizations &&
				<HOCOrganizationCard organizations={organizations} pointIndex={pointIndex} />
			}
			
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
					<OrganizationMap organizations={organizations} setPointIndex={setPointIndex} setCord={pointCords} />
				}
			</div>
			{
				organizations &&
				<>
				<div className="map__search">
					<HOCOrganizationSerch city={city} />
					<button onClick={() => setIsOpenedList(prev => !prev)} className="btn btn-icon btn-tiny btn-red">
						{
							!modalOpenedList 
								? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8 17C8.28333 17 8.52083 16.9042 8.7125 16.7125C8.90417 16.5208 9 16.2833 9 16C9 15.7167 8.90417 15.4792 8.7125 15.2875C8.52083 15.0958 8.28333 15 8 15C7.71667 15 7.47917 15.0958 7.2875 15.2875C7.09583 15.4792 7 15.7167 7 16C7 16.2833 7.09583 16.5208 7.2875 16.7125C7.47917 16.9042 7.71667 17 8 17ZM8 13C8.28333 13 8.52083 12.9042 8.7125 12.7125C8.90417 12.5208 9 12.2833 9 12C9 11.7167 8.90417 11.4792 8.7125 11.2875C8.52083 11.0958 8.28333 11 8 11C7.71667 11 7.47917 11.0958 7.2875 11.2875C7.09583 11.4792 7 11.7167 7 12C7 12.2833 7.09583 12.5208 7.2875 12.7125C7.47917 12.9042 7.71667 13 8 13ZM8 9C8.28333 9 8.52083 8.90417 8.7125 8.7125C8.90417 8.52083 9 8.28333 9 8C9 7.71667 8.90417 7.47917 8.7125 7.2875C8.52083 7.09583 8.28333 7 8 7C7.71667 7 7.47917 7.09583 7.2875 7.2875C7.09583 7.47917 7 7.71667 7 8C7 8.28333 7.09583 8.52083 7.2875 8.7125C7.47917 8.90417 7.71667 9 8 9ZM12 17H16C16.2833 17 16.5208 16.9042 16.7125 16.7125C16.9042 16.5208 17 16.2833 17 16C17 15.7167 16.9042 15.4792 16.7125 15.2875C16.5208 15.0958 16.2833 15 16 15H12C11.7167 15 11.4792 15.0958 11.2875 15.2875C11.0958 15.4792 11 15.7167 11 16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM12 13H16C16.2833 13 16.5208 12.9042 16.7125 12.7125C16.9042 12.5208 17 12.2833 17 12C17 11.7167 16.9042 11.4792 16.7125 11.2875C16.5208 11.0958 16.2833 11 16 11H12C11.7167 11 11.4792 11.0958 11.2875 11.2875C11.0958 11.4792 11 11.7167 11 12C11 12.2833 11.0958 12.5208 11.2875 12.7125C11.4792 12.9042 11.7167 13 12 13ZM12 9H16C16.2833 9 16.5208 8.90417 16.7125 8.7125C16.9042 8.52083 17 8.28333 17 8C17 7.71667 16.9042 7.47917 16.7125 7.2875C16.5208 7.09583 16.2833 7 16 7H12C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z" fill="white" />
									</svg>
								: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M18.3 5.70973C17.91 5.31973 17.28 5.31973 16.89 5.70973L12 10.5897L7.10997 5.69973C6.71997 5.30973 6.08997 5.30973 5.69997 5.69973C5.30997 6.08973 5.30997 6.71973 5.69997 7.10973L10.59 11.9997L5.69997 16.8897C5.30997 17.2797 5.30997 17.9097 5.69997 18.2997C6.08997 18.6897 6.71997 18.6897 7.10997 18.2997L12 13.4097L16.89 18.2997C17.28 18.6897 17.91 18.6897 18.3 18.2997C18.69 17.9097 18.69 17.2797 18.3 16.8897L13.41 11.9997L18.3 7.10973C18.68 6.72973 18.68 6.08973 18.3 5.70973Z" fill="white"/>
									</svg> 	
						}
						
					</button>
					<HOCOrganizationFilters city={city} />

				</div>
				{
					modalOpenedList &&
					<HOCOrganizationLists organizations={organizations} setPointIndex={setPointIndex} set={setIsOpenedList} setCord={setPointCords} />
				}
				
				</>
				
			}
			


		</div>

	)
}
export default observer(HOCOrganizations)