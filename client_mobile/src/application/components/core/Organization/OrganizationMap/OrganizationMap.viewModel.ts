import { PointsReducer, ReducerActionTypePoints, initialStatePointsMap } from 'application/reducers/PointsReducer';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { useReducer, useEffect } from 'react';

export function useOrganizationMapViewModel(this:any,organizations:IOrganization[]) {

	const [statePoint, dispatchPoint] = useReducer(
		PointsReducer,
		initialStatePointsMap
	);

	useEffect(() => {
		randomPoint()
	}, [])

	
	const randomPoint = async () => {
		try {
			const randomindex = Math.floor(Math.random() * organizations.length)

			dispatchPoint({
				type: ReducerActionTypePoints.slidePoint,
				payload: randomindex
			});
		} catch (error) {
			console.log(error)
		}
	};

	const placemarkClickHandler = (address: IOrganization, index: number) => {
		dispatchPoint({
			type: ReducerActionTypePoints.placemarkClick,
			payload: { address, index }
		});
	};

	this.data({
		statePoint,
		organizations
	});
	this.handlers({
		placemarkClickHandler
	});
	this.status({

	});


}