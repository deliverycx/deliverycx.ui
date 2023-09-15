import {QueryClient} from 'react-query'
import { NestedRoute } from './routes/NestedRoute';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';



const App = (): JSX.Element => {

	return (
		<>
			<BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
			{

				//NestedRoute()
			}


		</>

	)
}

export default App;
