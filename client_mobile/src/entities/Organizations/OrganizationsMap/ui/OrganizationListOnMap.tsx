import { FC } from 'react';
import { IOrganization } from 'shared/module/organizations/interfaces/types/organization.type';

const OrganizationListOnMap: FC<{
	organizations: IOrganization[] | null;
	action: (organization: IOrganization) => React.JSX.Element;
}> = ({ organizations, action }) => {
	return (
		<>
			{organizations &&
				Array.isArray(organizations) &&
				organizations.map((organization) => {
					if (organization.info && organization.info.cords.length !== 0) {
						return action(organization);
					}
				})}
		</>
	);
};
export default OrganizationListOnMap;
