import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { FC } from 'react';
import { useOrganizationsViewModel } from '../Organization.viewModel';
import { TadapterCaseCallback, adapterComponentUseCase } from 'adapters/adapterComponents';
import React from 'react';
import YMapPoint from './YMapPoint';
import { useOrganizationMapViewModel } from './OrganizationMap.viewModel';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';


const OrganizationMap: FC<{ organizations: IOrganization[],setCord:any }> = ({ organizations,setCord }) => {
	const useCase = adapterComponentUseCase(useOrganizationMapViewModel, {organizations,setCord})
	const { statePoint } = useCase.data
	const { placemarkClickHandler } = useCase.handlers


	return (
		<>
			{
				organizations &&
				<YMapPoint statePoint={statePoint} addresses={organizations} placemarkClick={placemarkClickHandler} />
			}

		</>
	)
}
export default observer(OrganizationMap) 