import "./scss/index.scss";

import ReactDOM from 'react-dom';
import App from 'application/App';
import { store,persistor } from 'servises/redux/createStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { format } from 'date-fns'
import ProfileScreen from "./application/components/common/PersonalProfile/ProfileScreen";

const history = createBrowserHistory()


ReactDOM.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
         <ProfileScreen/>
     {/*<App />*/}
     </PersistGate>
  </Provider>,
	document.getElementById('root')
);

