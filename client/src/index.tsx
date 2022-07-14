import "./scss/index.scss";

import ReactDOM from 'react-dom';
import App from 'application/App';
import { store,persistor } from 'servises/redux/createStore';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';;
import { PersistGate } from 'redux-persist/integration/react';

const history = createBrowserHistory()


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
        {/*<LoaderScreen/>*/}
    </PersistGate>
  </Provider>,
	document.getElementById('root')
);

