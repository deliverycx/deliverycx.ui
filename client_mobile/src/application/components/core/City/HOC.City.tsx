import { adapterComponentUseCase } from 'adapters/adapterComponents';

import { observer } from 'mobx-react-lite';
import { useCityViewModel } from './useCity.viewModel';


const HOCCity = () =>{

	const useCase = adapterComponentUseCase(useCityViewModel)
	const {cityMap} = useCase.data
	const {submitCity} = useCase.handlers

	return (
		<>
		<button onClick={ submitCity}>sity</button>
		<input type="text" onChange={(e) => submitCity(e.target.value)} />
		{
			cityMap && cityMap.map((val:any) =>{
				return <span key={val.name}>{val.name}</span>
			})
		}
		</>
	)
}
export default observer(HOCCity) 