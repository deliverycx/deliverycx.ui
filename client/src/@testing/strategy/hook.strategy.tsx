/* eslint-disable no-mixed-spaces-and-tabs */
import { renderHook } from "@testing-library/react-hooks"
import { Provider } from 'react-redux'
import { store } from "servises/redux/createStore"
import { useGetCitiQuery } from "servises/repository/RTK/RTKLocation"

const updateTimeout = 5000

export const hookRender = (hook:any) =>{
	return renderHook(() => hook(),
			{
				wrapper: ({ children }) => {
					return <Provider store={store} >{children}</Provider>
				}
			})
}

export const hookRTK = (hook:any) =>{
	const {result,rerender,waitForNextUpdate} = hook
 	async function check(){
		const initialResponse:any = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);
    await waitForNextUpdate({ timeout: updateTimeout });

		rerender()
    const nextResponse:any = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
	}
	check()

	return hook
}