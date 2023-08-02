import { adapterComponentUseCase } from 'adapters/adapterComponents';


import { observer } from 'mobx-react-lite';
import { useCityViewModel } from './useCity.viewModel';
import { cityModel } from 'modules/CityModule/city.module';
import { CityDTO } from 'modules/CityModule/interfaces/city.dto';
import { ICity } from 'modules/CityModule/interfaces/city.type';
import CountCity from './view/CountCity';


const HOCCity = () =>{

	const useCase = adapterComponentUseCase(useCityViewModel)
	const {cityMap} = useCase.data
	const {seletCity,submitCity} = useCase.handlers

	console.log('render', new Date())


	return (
		<>
		<CountCity />
		<input type="text" onChange={(e) => seletCity(e.target.value)} />
		{
			cityMap && cityMap.map((val:ICity) =>{
				return <div key={val.id} onClick={()=> submitCity(val)}>{val.cityname} ({val.countOrganization})</div>
			})
		}
		</>
	)
}
export default observer(HOCCity) 