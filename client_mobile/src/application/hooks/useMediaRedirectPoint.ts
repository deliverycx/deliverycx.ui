import { isDesctomMediaQuery } from 'application/ResponseMedia';
import { ROUTE_APP } from 'application/contstans/route.const';
import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { useNavigate } from 'react-router-dom';

export const useMediaRedirectPoint = () => {
  const organization = organizationModel.selectOrganization;
  const descQuery = isDesctomMediaQuery();
  const navigate = useNavigate();

  const redirectToDectPoints = () => {
    if (!organization && descQuery) {
      navigate(ROUTE_APP.CITY);
      return false;
    }
    return true;
  };

  return { redirectToDectPoints };
};
