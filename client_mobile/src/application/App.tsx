import { QueryClient } from 'react-query';
import { NestedRoute } from './routes/NestedRoute';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { userUseCase } from 'modules/UserModule/user.module';
import { useEffect, useState } from 'react';
import { profileUseCase } from 'modules/Profile/profile.module';
import { YMInitializer } from 'react-yandex-metrika';
import RequestAdmins from 'servises/Request/Request.Admins';
import ErrorPage from './components/common/Errors/ErrorPage';

const App = (): JSX.Element => {
	const [checkSite, setCheckSite] = useState<any>()
	useEffect(() => {
		userUseCase.checkUserGuest();
		profileUseCase.getProfile();
		getcheckSite()
	}, []);

	const getcheckSite = async () => {
		try {
			const { data } = await RequestAdmins.offsite()
			setCheckSite(data)
		} catch (error) {
			console.log(error);
		}
	}
	console.log("checkSite", checkSite);

	return (
		<>
			<BrowserRouter>
				{
					checkSite && checkSite.guestvip ?
						<ErrorPage />
						: <AppRouter />

				}



			</BrowserRouter>
			{
				//NestedRoute()
			}

			{process.env.NODE_ENV === 'production' && (
				<YMInitializer
					accounts={[95794868]}
					options={{ webvisor: false }}
					version="2"
				/>
			)}
		</>
	);
};

export default App;
