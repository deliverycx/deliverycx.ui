import HOCFooterDesc from "application/components/common/Footer/HOC.footer.desc"
import HOCShopDesc from "../Shop/HOC.Shop.desc"
import HOCdescHead from "application/components/common/Head/HOC.desc.Head"
import HOCCity from "./HOC.City"
import CountCity from "./view/CountCity"
import ModalCard from "application/components/common/Modals/ModalCard"
import { adapterComponentUseCase } from "adapters/adapterComponents"
import { ICity } from "modules/CityModule/interfaces/city.type"
import { useCityViewModel } from "./useCity.viewModel"
import CityListView from "./view/CityListView"

const HOCCITYDesc = () => {
	const useCase = adapterComponentUseCase(useCityViewModel)
	const { cityList, selectCity } = useCase.data
	const { seletSerchCity, submitCity,closeModalDesc } = useCase.handlers
	
	

	return (
		<>
			<div className="container">
				<HOCdescHead />

			</div>
			<ModalCard setIsOpened={() => closeModalDesc()} theme={null} styles="modal_def">
				<div className="modal__wrapper">
					<div className="modal__header">
						<svg className="no-drag" onClick={() => closeModalDesc()} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M30.3 17.71C29.91 17.32 29.28 17.32 28.89 17.71L24 22.59L19.11 17.7C18.72 17.31 18.09 17.31 17.7 17.7C17.31 18.09 17.31 18.72 17.7 19.11L22.59 24L17.7 28.89C17.31 29.28 17.31 29.91 17.7 30.3C18.09 30.69 18.72 30.69 19.11 30.3L24 25.41L28.89 30.3C29.28 30.69 29.91 30.69 30.3 30.3C30.69 29.91 30.69 29.28 30.3 28.89L25.41 24L30.3 19.11C30.68 18.73 30.68 18.09 30.3 17.71Z" fill="#8D191D" />
						</svg>
						<h3>Выберете город</h3>
					</div>
					<CountCity />

					<div className="select__search">
						<div className="input__item input_icon input_icon_left">
							<label htmlFor="search">Выберите город</label>
							<div className="input__container">
								<img src={require("assets/images/icons/search.png")} alt="" />
								<input onChange={(e) => seletSerchCity(e.target.value)} placeholder="Найти" name="search" type="text" />
							</div>
						</div>
					</div>
					<ul className="select__list">
						{

							cityList && cityList.length !== 0 && cityList.map((cityMass: ICity[], index: number) => {

								return (
									<li className="select__item" key={index}>

										<div className="item__letter">{cityMass[0].cityname[0]}</div>
										<div className="select__item-box">
											{
												cityMass.map((val: ICity) => {

													return <CityListView key={val.id} submitCity={submitCity} city={val} />
												})
											}
										</div>

									</li>
								)

							})

						}
					</ul>
				</div>

			</ModalCard>
			<HOCShopDesc />

			<HOCFooterDesc />
		</>
	)
}
export default HOCCITYDesc