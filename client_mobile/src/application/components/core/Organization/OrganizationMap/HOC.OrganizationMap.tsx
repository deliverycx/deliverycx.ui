import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { FC } from 'react';
import { useOrganizationsViewModel } from '../Organization.viewModel';
import {
  TadapterCaseCallback,
  adapterComponentUseCase,
} from 'adapters/adapterComponents';
import React from 'react';
import YMapPoint from './YMapPoint';
import { useOrganizationMapViewModel } from './OrganizationMap.viewModel';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

type IProps = {
  organizations: IOrganization[];
  setCord: any;
  setPointIndex: any;
};

const OrganizationMap: FC<IProps> = ({
  organizations,
  setCord,
  setPointIndex,
}) => {
  const useCase = adapterComponentUseCase(useOrganizationMapViewModel, {
    organizations,
    setCord,
    setPointIndex,
  });
  const { statePoint } = useCase.data;
  const { placemarkClickHandler } = useCase.handlers;

  return (
    <>
      {organizations && (
        <YMapPoint
          statePoint={statePoint}
          addresses={organizations}
          placemarkClick={placemarkClickHandler}
        />
      )}
    </>
  );
};
export default observer(OrganizationMap);
