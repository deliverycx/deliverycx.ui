import {QueryClient} from 'react-query'
import { NestedRoute } from './routes/NestedRoute';
import HOCCity from './components/core/City/HOC.City';

const App = (): JSX.Element => {

	return (
		<>

			{
				NestedRoute()
			}


		</>

	)
}

export default App;
