import { FC, useState } from 'react';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { useOrganizationStatus } from 'application/hooks/useOrganizationStatus';
import { observer } from 'mobx-react-lite';
import OrganizationListsItem from './OrganizationListsItem';

type IProps = {
  set: any;
  organizations: IOrganization[];
  setCord: any;
  setPointIndex: any;
};

const HOCOrganizationLists: FC<IProps> = ({
  set,
  organizations,
  setCord,
  setPointIndex,
}) => {
  return (
    <>
      <div className="orglistmodal">
        <div className="orglist_box">
          {organizations &&
            organizations.map((org: any) => {
              return (
                <OrganizationListsItem
                  organization={org}
                  set={set}
                  setPointIndex={setPointIndex}
                  setCordPoint={setCord}
                  key={org.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
export default HOCOrganizationLists;
