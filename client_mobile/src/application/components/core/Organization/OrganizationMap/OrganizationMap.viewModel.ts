import { PointsReducer, ReducerActionTypePoints, initialStatePointsMap } from 'application/reducers/PointsReducer';
import { appUseCase } from 'modules/AppModule/app.module';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { organizationModel, useCaseOrganization } from 'modules/OrganizationModule/organization.module';
import { useReducer, useEffect } from 'react';

export function useOrganizationMapViewModel(this: any, { organizations, setCord,setPointIndex }: { organizations: IOrganization[], setCord: any,setPointIndex:any }) {
	const { selectOrganization } = organizationModel
	const [statePoint, dispatchPoint] = useReducer(
		PointsReducer,
		initialStatePointsMap
	);

		
	useEffect(() => {
		organizations && setCordPoint()
	}, [setCord,organizations])


	const randomPoint = () => {
		const randomindex = Math.floor(Math.random() * organizations.length)
		dispatchPoint({
			type: ReducerActionTypePoints.slidePoint,
			payload: randomindex
		});
	};

	const placemarkClickHandler = (organization: IOrganization, index: number) => {
		if (selectOrganization && selectOrganization.guid !== organization.guid) {
			appUseCase.clearApp()
		}
		useCaseOrganization.selectOrganization(organization)
		setPointIndex(organization.guid)
		dispatchPoint({
			type: ReducerActionTypePoints.placemarkClick,
			payload: { organization, index }
		});
	};

	const setCordPoint = () => {
		const index = organizations.findIndex((value) => {
			return value.info.cords === setCord

		})
		
		if (index !== -1) {
			dispatchPoint({
				type: ReducerActionTypePoints.slidePoint,
				payload: index
			});
		} else {
			randomPoint()
		}
	}

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