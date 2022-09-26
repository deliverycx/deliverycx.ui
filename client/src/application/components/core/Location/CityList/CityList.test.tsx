/* eslint-disable no-mixed-spaces-and-tabs */
import { configureStore } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import {act, render, screen, Variant} from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { adapterComponentUseCase } from 'adapters/adapterComponents'
import { useCitiList } from 'domain/use-case/useCaseLocation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, RootState, store } from 'servises/redux/createStore'
import { fetchUser } from 'servises/redux/slice/profileSlice'
import { useGetCitiQuery } from 'servises/repository/RTK/RTKLocation'
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import CityList from './CityList'
import RequestProfile from 'servises/repository/Axios/Request/Request.Profile'
import axios from 'axios'
import { RequestCart } from 'servises/repository/Axios/Request'
//jest.mock('react-redux')

const updateTimeout = 5000;
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('Список городов',() =>{

	function renderApp() {
    return render( 
      <Provider store={store}>
		    <PersistGate loading={null} persistor={persistor}>
					<CityList />
		    </PersistGate>  
  		</Provider>,
    );
  }

	it('reg',async () => {
		try {
		//const {data}  = await axios.post('http://localhost:5000/user/create') //http://localhost:8765/all
		const {data} = await RequestProfile.register()	
		console.log(data);
		
		} catch (error) {
			console.log(error);
		}
	})


	
	it('rtk get City',async () => {
		const { result, rerender, waitForNextUpdate  } = renderHook(() => useGetCitiQuery(''),
			{
				wrapper: ({ children }) => {
					return <Provider store={store} >{children}</Provider>
				}
			})
		
		const initialResponse:any = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);
    await waitForNextUpdate({ timeout: updateTimeout });

		rerender()
    const nextResponse:any = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
			
	})
		it('Siti useCase data',async () => {
			
			const { result, rerender, waitForNextUpdate  } = renderHook(() => adapterComponentUseCase(useCitiList), //adapterComponentUseCase(useCitiList)
			{
				wrapper: ({ children }) => {
					return <Provider store={store} >{children}</Provider>
				}
			})
			//await waitForNextUpdate({ timeout: 2000 });
			rerender()  
			const {cities} = result.current.data
			expect(cities).not.toHaveLength(0)

			const mocksity = [
				{ id: '6259402e02dae23bd9a4cbe9', name: 'Симферополь' },
      { id: '6259402e02dae23bd9a4cbf0', name: 'Воронеж' },
      { id: '6259402e02dae23bd9a4cbf3', name: 'Ялта' },
			]
			
			expect(cities).toEqual(         
			  expect.arrayContaining(mocksity)
			)
			renderApp()
		})
		
})
