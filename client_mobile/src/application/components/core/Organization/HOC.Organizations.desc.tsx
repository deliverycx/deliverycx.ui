import HOCFooterDesc from "application/components/common/Footer/HOC.footer.desc"
import ModalCard from "application/components/common/Modals/ModalCard"
import HOCShopDesc from "../Shop/HOC.Shop.desc"
import HOCdescHead from "application/components/common/Head/HOC.desc.Head"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganizationsViewModel } from "./Organization.viewModel"
import OrganizationMap from "./OrganizationMap/HOC.OrganizationMap";
import HOCOrganizationLists from "./OrganizationLists/HOC.OrganizationLists"
import { useState } from "react"
import { observer } from 'mobx-react-lite';
import HOCOrganizationFilters from "./OrganizationFilters/OrganizationFilters"
import HOCOrganizationSerch from "./OrganizationSerch/OrganizationSerch";
import { NavLink } from "react-router-dom"
import { ROUTE_APP } from './../../../contstans/route.const';
import HOCOrganizationCardDesc from "./OrganizationCard/HOC.OrganizationCard.desc"

const HOCOrganizationsDesc = () =>{
	const useCase = adapterComponentUseCase(useOrganizationsViewModel)
	const { city, organizations,pointCords,pointIndex } = useCase.data
	const { handleBackCity,closeModalDesc,setPointIndex,setPointCords } = useCase.handlers

	const [modalOpenedList, setIsOpenedList] = useState(false)
		return (
		<div className="point_page">
			<div className="container">
				<HOCdescHead />

			</div>
			<ModalCard setIsOpened={() => closeModalDesc()} theme={null} styles="point_modal-desc">
				<div className="modal__wrapper">
					<div className="modal__header-pointdesc">
						<div className="modal__header">
							<svg className="no-drag" onClick={() => closeModalDesc()} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M30.3 17.71C29.91 17.32 29.28 17.32 28.89 17.71L24 22.59L19.11 17.7C18.72 17.31 18.09 17.31 17.7 17.7C17.31 18.09 17.31 18.72 17.7 19.11L22.59 24L17.7 28.89C17.31 29.28 17.31 29.91 17.7 30.3C18.09 30.69 18.72 30.69 19.11 30.3L24 25.41L28.89 30.3C29.28 30.69 29.91 30.69 30.3 30.3C30.69 29.91 30.69 29.28 30.3 28.89L25.41 24L30.3 19.11C30.68 18.73 30.68 18.09 30.3 17.71Z" fill="#8D191D" />
							</svg>
							<h3>Выберете заведение</h3>
						</div>
						<NavLink className="backcity" to={ROUTE_APP.CITY}>Другой город</NavLink>
					</div>
					<div className="points-desc">
						<div className="points-desc_list">
						{
							organizations &&
							<HOCOrganizationLists organizations={organizations} setPointIndex={setPointIndex} set={setIsOpenedList} setCord={setPointCords} />
						
						}	
						</div>
						<div className="points-desc_map">
							<div className="points-desc_map-serch">
								<HOCOrganizationSerch city={city} />
								<HOCOrganizationFilters city={city} />
							</div>
							<div className="points-desc_map-box">
								{
									organizations &&
									<OrganizationMap organizations={organizations} setPointIndex={setPointIndex} setCord={pointCords} />
								}
							</div>
							<div className="points-desc_map-hr"></div>	
						</div>
					</div>
				</div>

			</ModalCard>

			<HOCOrganizationCardDesc />					

			<HOCShopDesc />

			<HOCFooterDesc />
		</div>
	)
	
}
export default observer(HOCOrganizationsDesc) 