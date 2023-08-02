import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { publicRoutes } from "./publicRoute";

export const NestedRoute = () =>{


	const router = createBrowserRouter([
		...publicRoutes
	]);

	
	return(
		<React.StrictMode>
				<RouterProvider router={router} />
			</React.StrictMode>
	)
}