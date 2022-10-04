/* eslint-disable no-mixed-spaces-and-tabs */
import { configureStore } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import {act, render, screen, Variant, waitFor, within} from '@testing-library/react'
import { renderHook,act as hookact } from '@testing-library/react-hooks'
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
import { ICity } from '@types'
import { setCiti } from 'servises/redux/slice/locationSlice'
import userEvent from '@testing-library/user-event'
import { register, renderApp } from '@testing/strategy/app.strategy'
import { hookRender, hookRTK } from '@testing/strategy/hook.strategy'
import { CityPageObject } from '@testing/pageObject/city.po'
//jest.mock('react-redux')

const updateTimeout = 5000;
const mockedAxios = axios as jest.Mocked<typeof axios>;


beforeAll(() => {
	register()
})

describe('Список городов',() =>{

	
	it('rtk get City',async () => {
		const hook = hookRender(() => useGetCitiQuery(''))
		hookRTK(hook)
/*
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
		*/	
	})
		it('Siti useCase data',async () => {
			const { result, rerender, waitForNextUpdate  } = hookRender(() => adapterComponentUseCase(useCitiList))
			await waitForNextUpdate({ timeout: 2000 });
			rerender() 
			CityPageObject.CityList(result)
			/*
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
				*/

		})
		
		it('Siti render',async () => {
			const { result, rerender, waitForNextUpdate  } = hookRender(() => adapterComponentUseCase(useCitiList))
			rerender() 
			const city = CityPageObject.CityList(result)
			renderApp() 
			CityPageObject.listRender(city)
			/*
			const { result, rerender, waitForNextUpdate  } = renderHook(() => adapterComponentUseCase(useCitiList), //adapterComponentUseCase(useCitiList)
			{
				wrapper: ({ children }) => {
					return <Provider store={store} >{children}</Provider>
				}
			})
			//await waitForNextUpdate({ timeout: 2000 });
			rerender()  
			const {cities,selectedCity} = result.current.data
			expect(cities).not.toHaveLength(0)

			renderApp()
			const list = await waitFor(()=> screen.getByTestId("list"))
			const utils = within(list);

			cities.forEach((val:ICity) => {
				!val.isHidden &&
				expect(utils.getByText(val.name)).toBeInTheDocument();
			})
			*/
		})
/*
		it('Siti serch',async () => {
			
			const { result, rerender, waitForNextUpdate  } = renderHook(() => useGetCitiQuery('Симферополь'),
			{
				wrapper: ({ children }) => {
					return <Provider store={store} >{children}</Provider>
				}
			})
			await waitForNextUpdate({ timeout: updateTimeout });
			rerender()
			const Response:any = result.current;
			const mocksity = [
				{ id: '6259402e02dae23bd9a4cbe9', name: 'Симферополь' },
			]
			
			expect(Response.data).toEqual(         
			  expect.arrayContaining(mocksity)
			)
			
		})
*/
		it('Siti click',async () => {
			const { result, rerender, waitForNextUpdate  } = hookRender(() => adapterComponentUseCase(useCitiList))
			rerender()
			const city = CityPageObject.CityList(result)
			CityPageObject.selectCiti(result,city)
			rerender()
			CityPageObject.selectedCity(result)
			
			/*
			const { result, rerender, waitForNextUpdate  } = renderHook(() => adapterComponentUseCase(useCitiList), //adapterComponentUseCase(useCitiList)
			{
				wrapper: ({ children }) => {
					return <Provider store={store} >{children}</Provider>
				}
			})
			//await waitForNextUpdate({ timeout: 2000 });
			rerender()  
			const {cities} = result.current.data
			const {selectCiti} = result.current.handlers
			expect(cities).not.toHaveLength(0)

			const mokCity = cities[0]

			hookact(()=> {
				selectCiti(mokCity)
			})
			rerender()
			const {selectedCity} = result.current.data
			expect(selectedCity).toEqual(mokCity)
			renderApp()
			expect(screen.getByText(mokCity.name)).toHaveClass('selected')
			*/
		})
		
})
