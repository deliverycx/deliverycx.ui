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
import { NavLink, useLocation } from "react-router-dom"
import { ROUTE_APP } from './../../../contstans/route.const';
import HOCOrganizationCardDesc from "./OrganizationCard/HOC.OrganizationCard.desc"

const HOCOrganizationsDesc = () => {
	const useCase = adapterComponentUseCase(useOrganizationsViewModel)
	const { city, organizations, pointCords, pointIndex } = useCase.data
	const { handleBackCity, closeModalDesc, setPointIndex, setPointCords } = useCase.handlers

	const [modalOpenedList, setIsOpenedList] = useState(false)

	const params = useLocation()
	return (
		<>
			{
				params.pathname === ROUTE_APP.POINT &&
				<>
					<ModalCard setIsOpened={() => closeModalDesc()} theme={null} styles="point_modal-desc">
						<div className="modal__wrapper">
							<div className="modal__header-pointdesc">
								<div className="modal__header">
									<svg className="no-drag" onClick={() => closeModalDesc()} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M30.3 17.71C29.91 17.32 29.28 17.32 28.89 17.71L24 22.59L19.11 17.7C18.72 17.31 18.09 17.31 17.7 17.7C17.31 18.09 17.31 18.72 17.7 19.11L22.59 24L17.7 28.89C17.31 29.28 17.31 29.91 17.7 30.3C18.09 30.69 18.72 30.69 19.11 30.3L24 25.41L28.89 30.3C29.28 30.69 29.91 30.69 30.3 30.3C30.69 29.91 30.69 29.28 30.3 28.89L25.41 24L30.3 19.11C30.68 18.73 30.68 18.09 30.3 17.71Z" fill="#8D191D" />
									</svg>
									<h3>Выберете заведение</h3>
								</div>


								<div className="points-desc_head">
									<div className="points-desc_map-serch">
										<HOCOrganizationSerch city={city} />
									</div>
									<div className="points-desc_head-section">
										<div className="points-desc_map-list">
											<button className="btn btn-icon btn-tiny btn-red" onClick={() => setIsOpenedList((prev: boolean) => !prev)}>

												{
													modalOpenedList ?

														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M18.3002 5.70875C17.9102 5.31875 17.2802 5.31875 16.8902 5.70875L12.0002 10.5888L7.11022 5.69875C6.72022 5.30875 6.09021 5.30875 5.70021 5.69875C5.31021 6.08875 5.31021 6.71875 5.70021 7.10875L10.5902 11.9988L5.70021 16.8887C5.31021 17.2787 5.31021 17.9087 5.70021 18.2987C6.09021 18.6887 6.72022 18.6887 7.11022 18.2987L12.0002 13.4087L16.8902 18.2987C17.2802 18.6887 17.9102 18.6887 18.3002 18.2987C18.6902 17.9087 18.6902 17.2787 18.3002 16.8887L13.4102 11.9988L18.3002 7.10875C18.6802 6.72875 18.6802 6.08875 18.3002 5.70875Z" fill="white" />
														</svg> :
														<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M8.5 17.75C8.78333 17.75 9.02083 17.6542 9.2125 17.4625C9.40417 17.2708 9.5 17.0333 9.5 16.75C9.5 16.4667 9.40417 16.2292 9.2125 16.0375C9.02083 15.8458 8.78333 15.75 8.5 15.75C8.21667 15.75 7.97917 15.8458 7.7875 16.0375C7.59583 16.2292 7.5 16.4667 7.5 16.75C7.5 17.0333 7.59583 17.2708 7.7875 17.4625C7.97917 17.6542 8.21667 17.75 8.5 17.75ZM8.5 13.75C8.78333 13.75 9.02083 13.6542 9.2125 13.4625C9.40417 13.2708 9.5 13.0333 9.5 12.75C9.5 12.4667 9.40417 12.2292 9.2125 12.0375C9.02083 11.8458 8.78333 11.75 8.5 11.75C8.21667 11.75 7.97917 11.8458 7.7875 12.0375C7.59583 12.2292 7.5 12.4667 7.5 12.75C7.5 13.0333 7.59583 13.2708 7.7875 13.4625C7.97917 13.6542 8.21667 13.75 8.5 13.75ZM8.5 9.75C8.78333 9.75 9.02083 9.65417 9.2125 9.4625C9.40417 9.27083 9.5 9.03333 9.5 8.75C9.5 8.46667 9.40417 8.22917 9.2125 8.0375C9.02083 7.84583 8.78333 7.75 8.5 7.75C8.21667 7.75 7.97917 7.84583 7.7875 8.0375C7.59583 8.22917 7.5 8.46667 7.5 8.75C7.5 9.03333 7.59583 9.27083 7.7875 9.4625C7.97917 9.65417 8.21667 9.75 8.5 9.75ZM12.5 17.75H16.5C16.7833 17.75 17.0208 17.6542 17.2125 17.4625C17.4042 17.2708 17.5 17.0333 17.5 16.75C17.5 16.4667 17.4042 16.2292 17.2125 16.0375C17.0208 15.8458 16.7833 15.75 16.5 15.75H12.5C12.2167 15.75 11.9792 15.8458 11.7875 16.0375C11.5958 16.2292 11.5 16.4667 11.5 16.75C11.5 17.0333 11.5958 17.2708 11.7875 17.4625C11.9792 17.6542 12.2167 17.75 12.5 17.75ZM12.5 13.75H16.5C16.7833 13.75 17.0208 13.6542 17.2125 13.4625C17.4042 13.2708 17.5 13.0333 17.5 12.75C17.5 12.4667 17.4042 12.2292 17.2125 12.0375C17.0208 11.8458 16.7833 11.75 16.5 11.75H12.5C12.2167 11.75 11.9792 11.8458 11.7875 12.0375C11.5958 12.2292 11.5 12.4667 11.5 12.75C11.5 13.0333 11.5958 13.2708 11.7875 13.4625C11.9792 13.6542 12.2167 13.75 12.5 13.75ZM12.5 9.75H16.5C16.7833 9.75 17.0208 9.65417 17.2125 9.4625C17.4042 9.27083 17.5 9.03333 17.5 8.75C17.5 8.46667 17.4042 8.22917 17.2125 8.0375C17.0208 7.84583 16.7833 7.75 16.5 7.75H12.5C12.2167 7.75 11.9792 7.84583 11.7875 8.0375C11.5958 8.22917 11.5 8.46667 11.5 8.75C11.5 9.03333 11.5958 9.27083 11.7875 9.4625C11.9792 9.65417 12.2167 9.75 12.5 9.75ZM5.5 21.75C4.95 21.75 4.47917 21.5542 4.0875 21.1625C3.69583 20.7708 3.5 20.3 3.5 19.75V5.75C3.5 5.2 3.69583 4.72917 4.0875 4.3375C4.47917 3.94583 4.95 3.75 5.5 3.75H19.5C20.05 3.75 20.5208 3.94583 20.9125 4.3375C21.3042 4.72917 21.5 5.2 21.5 5.75V19.75C21.5 20.3 21.3042 20.7708 20.9125 21.1625C20.5208 21.5542 20.05 21.75 19.5 21.75H5.5ZM5.5 19.75H19.5V5.75H5.5V19.75Z" fill="white" />
														</svg>
												}
												Список
											</button>
											{
												modalOpenedList && organizations &&
												<div className="points-desc_list">
													<HOCOrganizationLists organizations={organizations} setPointIndex={setPointIndex} set={setIsOpenedList} setCord={setPointCords} />
												</div>
											}
										</div>
										<div className="points-desc_map-filter">
											<HOCOrganizationFilters city={city} />
										</div>

									</div>
								</div>
							</div>

							<div className="points-desc_map">
								<HOCOrganizationCardDesc />
								<div className="points-desc_map-box">
									{
										organizations &&
										<OrganizationMap organizations={organizations} setPointIndex={setPointIndex} setCord={pointCords} />
									}
								</div>

							</div>

						</div>

					</ModalCard>


				</>
			}
		</>
	)

}
export default observer(HOCOrganizationsDesc) 