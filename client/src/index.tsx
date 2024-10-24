import "./scss/index.scss";

import ReactDOM from 'react-dom';
import App from 'application/App';
import { store,persistor } from 'servises/redux/createStore';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';
import LoaderScreen from "application/components/core/LoaderScreen/LoaderScreen";
import { ROUTE_APP } from "application/contstans/route.const";

const history = createBrowserHistory()

//history.push(ROUTE_APP.ERROR)
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<LoaderScreen />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

