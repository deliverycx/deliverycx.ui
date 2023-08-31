import { adapterComponentUseCase } from 'adapters/adapterComponents';


import { observer } from 'mobx-react-lite';
import { useCityViewModel } from './useCity.viewModel';
import { cityModel } from 'modules/CityModule/city.module';
import { CityDTO } from 'modules/CityModule/interfaces/city.dto';
import { ICity } from 'modules/CityModule/interfaces/city.type';
import CountCity from './view/CountCity';
import CityListView from './view/CityListView';


const HOCCity = () =>{

	const useCase = adapterComponentUseCase(useCityViewModel)
	const {cityList} = useCase.data
	const {seletSerchCity,submitCity} = useCase.handlers

	//console.log('city render', new Date());

	return (
		<>
		<CountCity />
		<input type="text" onChange={(e) => seletSerchCity(e.target.value)} />

		{

			cityList && cityList.map((cityMass:ICity[],index:number) =>{

				return (<section key={index}>
					
					<h3>{cityMass[0].cityname[0]}</h3>
					{
						cityMass.map((val:ICity)=>{
							
							return <CityListView key={val.id} submitCity={submitCity} city={val} />
						})
					}
				</section>)
				
			})
			
		}
		</>
	)
}
export default observer(HOCCity)

//<CityListView key={val.id} submitCity={submitCity} city={val} />