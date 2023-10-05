import { PointsReducer, ReducerActionTypePoints, initialStatePointsMap } from 'application/reducers/PointsReducer';
import { appUseCase } from 'modules/AppModule/app.module';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { organizationModel, useCaseOrganization } from 'modules/OrganizationModule/organization.module';
import { useReducer, useEffect } from 'react';

export function useOrganizationMapViewModel(this:any,organizations:IOrganization[]) {
	const {selectOrganization} = organizationModel
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

	const placemarkClickHandler = (organization: IOrganization, index: number) => {
		useCaseOrganization.selectOrganization(organization)
		dispatchPoint({
			type: ReducerActionTypePoints.placemarkClick,
			payload: { organization, index }
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