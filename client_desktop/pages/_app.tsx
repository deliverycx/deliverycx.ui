import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import { store,persistor } from 'servises/redux/createStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';


function MyApp({ Component, pageProps }: AppProps) {
	

  const handleWindowResize = useMemo(() => debounce(() => {
    if (window.innerWidth < 1024) {
      window.location.href = process.env.NEXT_PUBLIC_MOB as string
    }
  }, 200), [])

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [])



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
