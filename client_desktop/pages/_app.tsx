import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import { store,persistor } from 'servises/redux/createStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
  
}

export default MyApp
