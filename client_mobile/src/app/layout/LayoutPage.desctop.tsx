import { FC } from 'react';
import { ReactNode } from 'react';
import HOCFooterDesc from 'application/components/common/Footer/HOC.footer.desc'
import HOCdescHead from 'application/components/common/Head/HOC.desc.Head';
import OfferAuth from 'application/components/common/Auth/view/OfferAuth';
import ModalCard from 'application/components/common/Modals/ModalCard';
import HOCOrganizationsDesc from 'application/components/core/Organization/HOC.Organizations.desc';
import { ROUTE_APP } from 'application/contstans/route.const';
import CitiesPageDesctop from 'pages/Cities/ui/CitiesPage.desctop';
import { useLocation, useNavigate } from 'react-router-dom';

const LayoutPageDesctop: FC<{ children: ReactNode }> = ({ children }) => {
	const params = useLocation();
	const navigate = useNavigate();
	return (
		<>

			<div className="layout-head">
				<div className="container">

					<CitiesPageDesctop />
					{params.pathname === ROUTE_APP.AUTH.AUTORIZATE && (
						<ModalCard
							setIsOpened={() => navigate(-1)}
							theme={null}
							styles="login-container_modal"
						>
							<OfferAuth />
						</ModalCard>
					)}
					{params.pathname === ROUTE_APP.CITY && <CitiesPageDesctop />}
					{params.pathname === ROUTE_APP.POINT && <HOCOrganizationsDesc />}
				</div>
			</div>
			<div className="gray-bg">
				<div className="container">
					{children}
				</div>
			</div>

			<HOCFooterDesc />
		</>
	);
}
export default LayoutPageDesctop