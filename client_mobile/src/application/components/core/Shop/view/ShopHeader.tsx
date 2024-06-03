import { NavLink } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { FC } from 'react';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';

const ShopHeader: FC<{ organization: IOrganization }> = ({ organization }) => {
  return (
    <div className="catalogue-header__info">
      <NavLink to={ROUTE_APP.POINT} className="catalogue-header__info-geo">
        <img
          src={require('assets/images/icons/store.png')}
          alt={organization.info.address}
        />
        {organization.info.city}, {organization.info.address}
      </NavLink>

      <a
        className="catalogue-header__info-phone"
        href={`tel:${organization.info.phone}`}
      >
        <img src={require('assets/images/icons/phone.png')} alt="Телефончик" />
        {organization.info.phone}
      </a>
    </div>
  );
};
export default ShopHeader;
