import "./scss/index.scss";

import ReactDOM from 'react-dom';
import App from 'application/App';
import { store,persistor } from 'servises/redux/createStore';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createRoot } from 'react-dom/client';

const container = document.getElementById("root");
const root = createRoot(container!)


root.render(
    <Provider store={store}>
        <App />
    </Provider>
    
);

