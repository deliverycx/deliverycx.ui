/* eslint-disable @typescript-eslint/no-var-requires */
import { adapterComponentUseCase } from 'adapters/adapterComponents';


import { observer } from 'mobx-react-lite';
import { useCityViewModel } from './useCity.viewModel';
import { cityModel } from 'modules/CityModule/city.module';
import { ICity } from 'modules/CityModule/interfaces/city.type';
import CountCity from './view/CountCity';
import CityListView from './view/CityListView';



const HOCCity = () => {

	const useCase = adapterComponentUseCase(useCityViewModel)
	const { cityList, selectCity } = useCase.data
	const { seletSerchCity, submitCity } = useCase.handlers



	return (
		<>
			
			<div className="select__header">
				<img src={require("assets/images/logo.jpg")} alt="Старик Хинкалыч" />
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

					cityList && cityList.map((cityMass: ICity[], index: number) => {

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
		</>
	)
}
export default observer(HOCCity)

//<CityListView key={val.id} submitCity={submitCity} city={val} />