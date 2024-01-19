import ModalCard from "application/components/common/Modals/ModalCard"
import { imgRoutDef } from "application/helpers/imgAdmin"
import { ICity } from "modules/CityModule/interfaces/city.type"
import { requestOrganization, requestOrganizationApi } from "modules/OrganizationModule/Organization/data/organization.request"
import { OrganizationFilters } from "modules/OrganizationModule/Organization/interfaces/organization.type"
import { organizationModel } from "modules/OrganizationModule/organization.module"
import { FC, useEffect, useState } from "react"
import cn from "classnames"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrganizationFiltersViewModel } from "./OrganizationFilters.viewModel"
import { Desktop, Mobile } from "application/ResponseMedia"

const HOCOrganizationFilters: FC<{ city: ICity }> = ({ city }) => {
	const useCase = adapterComponentUseCase(useOrganizationFiltersViewModel, city)
	const { filters, isOpenedFilters, changeFilter } = useCase.data
	const { setIsOpenedFilters, handlerFiler, handlerResetFilter } = useCase.handlers


	return (
		<>
			{
				filters &&
				<button onClick={() => setIsOpenedFilters((prev:boolean) => !prev)} className="btn btn-icon btn-tiny btn-red">
					{
						isOpenedFilters ?
						
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18.3002 5.70875C17.9102 5.31875 17.2802 5.31875 16.8902 5.70875L12.0002 10.5888L7.11022 5.69875C6.72022 5.30875 6.09021 5.30875 5.70021 5.69875C5.31021 6.08875 5.31021 6.71875 5.70021 7.10875L10.5902 11.9988L5.70021 16.8887C5.31021 17.2787 5.31021 17.9087 5.70021 18.2987C6.09021 18.6887 6.72022 18.6887 7.11022 18.2987L12.0002 13.4087L16.8902 18.2987C17.2802 18.6887 17.9102 18.6887 18.3002 18.2987C18.6902 17.9087 18.6902 17.2787 18.3002 16.8887L13.4102 11.9988L18.3002 7.10875C18.6802 6.72875 18.6802 6.08875 18.3002 5.70875Z" fill="white" />
							</svg> :
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M11 18H13C13.55 18 14 17.55 14 17C14 16.45 13.55 16 13 16H11C10.45 16 10 16.45 10 17C10 17.55 10.45 18 11 18ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7ZM7 13H17C17.55 13 18 12.55 18 12C18 11.45 17.55 11 17 11H7C6.45 11 6 11.45 6 12C6 12.55 6.45 13 7 13Z" fill="white" />
							</svg>
					}


				</button>
			}

			{
				isOpenedFilters && filters &&
				<Desktop>
					<div className="filter_modal-desc">
						<div className="modal__content gap-16">
							<div className="map__filters-list">
								{
									filters.map((val: OrganizationFilters) => {
										const CN = cn("filter", { active: changeFilter?.includes(val._id) })
										return val && (
											<section key={val._id} onClick={() => handlerFiler(val._id)}>
												<button className={CN}>
													{
														val.images &&
														<img src={imgRoutDef(val.images[0])} />
													}
													{val.name}
												</button>
											</section>
										)
									})
								}
							</div>
							<div className="d-flex flex-column gap-8 filers-button">
								<button onClick={() => setIsOpenedFilters(false)} className="btn btn-sm btn-red no-drag">
									Принять
								</button>
								<button onClick={handlerResetFilter} className="btn btn-sm btn-gray no-drag">
									Сбросить
								</button>
							</div>
						</div>
					</div>
				</Desktop>
			}

			{
				isOpenedFilters && filters &&
				<Mobile>
					<ModalCard setIsOpened={setIsOpenedFilters}>
						<div className="modal__wrapper">
							<div className="modal__header">
								<svg className="no-drag" onClick={() => setIsOpenedFilters(false)} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M30.3 17.71C29.91 17.32 29.28 17.32 28.89 17.71L24 22.59L19.11 17.7C18.72 17.31 18.09 17.31 17.7 17.7C17.31 18.09 17.31 18.72 17.7 19.11L22.59 24L17.7 28.89C17.31 29.28 17.31 29.91 17.7 30.3C18.09 30.69 18.72 30.69 19.11 30.3L24 25.41L28.89 30.3C29.28 30.69 29.91 30.69 30.3 30.3C30.69 29.91 30.69 29.28 30.3 28.89L25.41 24L30.3 19.11C30.68 18.73 30.68 18.09 30.3 17.71Z" fill="#8D191D" />
								</svg>
								<h3>Фильтры</h3>
							</div>
							<div className="modal__content gap-16">
								<div className="map__filters-list">
									{
										filters.map((val: OrganizationFilters) => {
											const CN = cn("filter", { active: changeFilter?.includes(val._id) })
											return val && (
												<section key={val._id} onClick={() => handlerFiler(val._id)}>
													<button className={CN}>
														{
															val.images &&
															<img src={imgRoutDef(val.images[0])} />
														}
														{val.name}
													</button>
												</section>
											)
										})
									}
								</div>
								<div className="d-flex flex-column gap-8">
									<button onClick={() => setIsOpenedFilters(false)} className="btn btn-sm btn-red no-drag">
										Принять
									</button>
									<button onClick={handlerResetFilter} className="btn btn-sm btn-gray no-drag">
										Сбросить
									</button>
								</div>
							</div>
						</div>

					</ModalCard>
				</Mobile>
			}

		</>
	)
}
export default HOCOrganizationFilters