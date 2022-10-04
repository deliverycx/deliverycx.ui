import {act, render, screen, Variant, waitFor, within} from '@testing-library/react'
import { renderHook,act as hookact } from '@testing-library/react-hooks'
import { renderApp } from '@testing/strategy/app.strategy'
import { ICity } from "@types"

/* eslint-disable no-mixed-spaces-and-tabs */
export class CityPageObject {
	private static mocksity:any[] = [
		{ id: '6259402e02dae23bd9a4cbe9', name: 'Симферополь' },
		{ id: '6259402e02dae23bd9a4cbf0', name: 'Воронеж' },
		{ id: '6259402e02dae23bd9a4cbf3', name: 'Ялта' },
	]

	public static CityList(result:any){
			const {cities} = result.current.data
			expect(cities).not.toHaveLength(0)
			expect(cities).toEqual(         
			  expect.arrayContaining(CityPageObject.mocksity)
			)
			return cities
	}
	public static async  listRender(cities:any){
			const list = await waitFor(()=> screen.getByTestId("list"))
			const utils = within(list);

			cities.forEach((val:ICity) => {
				!val.isHidden &&
				expect(utils.getByText(val.name)).toBeInTheDocument();
			})
	}
	public static sechBuCity(result:any){
			const response:any = result.current;
			const mocksity = [
				{ id: '6259402e02dae23bd9a4cbe9', name: 'Симферополь' },
			]
			console.log(result.current);
			/*
			expect(response.data).toEqual(         
			  expect.arrayContaining(mocksity)
			)
			*/
	}

	public static selectCiti(result:any,city:any){
		const {selectCiti} = result.current.handlers
		hookact(()=> {
			selectCiti(city[0])
		})
	}
	public static selectedCity(result:any){
		const {selectedCity} = result.current.data
		expect(selectedCity).toEqual(CityPageObject.mocksity[0])
		renderApp()
		expect(screen.getByText(CityPageObject.mocksity[0].name)).toHaveClass('selected')
	}
}