/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, Middleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import tv4 from 'tv4';
import testReduser from './slice/test.slice';


const history = createBrowserHistory()
const persistConfig = {
  key: "delivery",
  storage,
  blacklist: [
		testReduser.name
  ],
  transforms: [
    createTransform(
      (inboundState, key) => {
        return inboundState;
      },
      (outboundState, key) => { 
        return outboundState
      },
      {
        whitelist: [

        ]
      }
    )
  ]
};

const createRootReducer = combineReducers({
  [testReduser.name]: testReduser.reducer,
})

const persistedReducer = persistReducer(persistConfig, createRootReducer);

const customMiddleware: Middleware<Record<string, unknown>, RootState> = store => next => action => {
  
  
  const res = next(action);
  return res;
};


const validateMiddleware: Middleware<Record<string, unknown>, RootState> = store => next => action => {
  
  const res = next(action);
	
	//const result = tv4.validateResult(store, {});
  
  return res;
};

const middlewares = [routerMiddleware(history), customMiddleware,validateMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

const store = configureStore({
  reducer:persistedReducer,
  middleware:  (getDefaultMiddleware) => [...getDefaultMiddleware({
    serializableCheck: false
  }), ...middlewares],
  devTools: process.env.NODE_ENV !== 'production',
})

const persistor = persistStore(store, undefined, async () => {
	console.log('go');
});

export { store, persistor }
export type RootState = ReturnType<typeof createRootReducer>;
export type AppDispatch = typeof store.dispatch;

