import { isDesctomMediaQuery } from 'application/ResponseMedia';
import {
	PointsReducer,
	ReducerActionTypePoints,
	initialStatePointsMap,
} from 'application/reducers/PointsReducer';
import { appUseCase } from 'modules/AppModule/app.module';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import {
	organizationModel,
	organizationModule,
} from 'modules/OrganizationModule/organization.module';
import { useReducer, useEffect, useMemo, useCallback } from 'react';

export function useOrganizationMapViewModel(
	this: any,
	{
		organizations,
		setCord,
		setPointIndex,
	}: { organizations: IOrganization[]; setCord: any; setPointIndex: any },
) {
	const { selectOrganization } = organizationModel;
	const [statePoint, dispatchPoint] = useReducer(
		PointsReducer,
		initialStatePointsMap,
	);
	const desc = isDesctomMediaQuery();

	useEffect(() => {
		organizations && setCordPoint();
	}, [setCord, organizations]);

	const randomPoint = useCallback(() => {
		if (!desc) {
			const randomindex = Math.floor(Math.random() * organizations.length);
			dispatchPoint({
				type: ReducerActionTypePoints.slidePoint,
				payload: randomindex,
			});
		}
	}, [])

	const placemarkClickHandler = (
		organization: IOrganization,
		index: number,
	) => {
		if (
			selectOrganization &&
			selectOrganization.guid !== organization.guid &&
			!desc
		) {
			appUseCase.clearApp();
		}

		if (desc && selectOrganization) {
			if (selectOrganization.guid !== organization.guid) {
				appUseCase.crealPoint();
			}
		}
		organizationModule.handlerBus.choosePoint(organization);
		//useCaseOrganization.selectOrganization(organization)
		setPointIndex(organization.guid);
		dispatchPoint({
			type: ReducerActionTypePoints.placemarkClick,
			payload: { organization, index },
		});
	};

	const setCordPoint = () => {
		const index = organizations.findIndex((value) => {
			return value.info.cords === setCord;
		});

		if (index !== -1) {
			dispatchPoint({
				type: ReducerActionTypePoints.slidePoint,
				payload: index,
			});
		} else {
			randomPoint();
		}
	};

	this.data({
		statePoint,
		organizations,
	});
	this.handlers({
		placemarkClickHandler,
	});
	this.status({});
}
