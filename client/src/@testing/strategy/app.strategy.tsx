import { render } from "@testing-library/react";
import CityList from "application/components/core/Location/CityList/CityList";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "servises/redux/createStore";
import RequestProfile from "servises/repository/Axios/Request/Request.Profile";

export const renderApp = () =>{
	return render( 
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<CityList />
			</PersistGate>  
		</Provider>,
	);
}

export const register = async () =>{
	try {
		//const {data}  = await axios.post('http://localhost:5000/user/create') //http://localhost:8765/all
		const {data} = await RequestProfile.register()	
		
		} catch (error) {
			console.log(error);
		}
}