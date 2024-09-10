import { QueryClient } from 'react-query';
import { NestedRoute } from './routes/NestedRoute';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { userUseCase } from 'modules/UserModule/user.module';
import { useEffect } from 'react';
import { profileUseCase } from 'modules/Profile/profile.module';
import { YMInitializer } from 'react-yandex-metrika';

const App = (): JSX.Element => {
	useEffect(() => {
		userUseCase.checkUserGuest();
		profileUseCase.getProfile();
	}, []);

	return (
		<>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
			{
				//NestedRoute()
			}

			{/*process.env.NODE_ENV === 'production' && (
        <YMInitializer
          accounts={[95794868]}
          options={{ webvisor: true }}
          version="2"
        />
      )*/}
		</>
	);
};

export default App;
