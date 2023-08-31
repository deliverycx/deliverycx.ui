import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { FC } from 'react';
import { useOrganizationsViewModel } from '../Organization.viewModel';
import { TadapterCaseCallback, adapterComponentUseCase } from 'adapters/adapterComponents';
import React from 'react';
import YMapPoint from './YMapPoint';
import { useOrganizationMapViewModel } from './OrganizationMap.viewModel';


const OrganizationMap:FC<{organizations:IOrganization[]}> = ({organizations}) =>{
	const useCase = adapterComponentUseCase(useOrganizationMapViewModel,organizations)
	const {statePoint} = useCase.data
	const {placemarkClickHandler} = useCase.handlers

	
	return(
		<>
		<YMapPoint statePoint={statePoint} addresses={organizations} placemarkClick={placemarkClickHandler} />
		</>
	)
}
export default OrganizationMap