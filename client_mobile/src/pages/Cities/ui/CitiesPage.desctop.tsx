import ModalCard from 'application/components/common/Modals/ModalCard';
import { ROUTE_APP } from 'application/contstans/route.const';
import { useCitiesQuery } from 'entities/cities/queries/cities.query';
import { useLocation, useNavigate } from 'react-router-dom';
import CitiesCount from 'widgets/Cities/CitiesCount/ui/CitiesCount';
import CitiesList from 'widgets/Cities/CitiesList/ui/CitiesList';

const CitiesPageDesctop = () => {
	const { data: cities } = useCitiesQuery();
	const navigate = useNavigate();

	const params = useLocation();

	const closeModalDesc = () => {
		navigate(ROUTE_APP.MAIN);
	};

	return (
		<>
			{params.pathname === ROUTE_APP.CITY && (
				<ModalCard
					setIsOpened={() => closeModalDesc()}
					theme={null}
					styles="modal_def citymodal"
				>
					<div className="modal__wrapper">
						<div className="modal__header">
							<svg
								className="no-drag"
								onClick={() => closeModalDesc()}
								width="48"
								height="48"
								viewBox="0 0 48 48"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M30.3 17.71C29.91 17.32 29.28 17.32 28.89 17.71L24 22.59L19.11 17.7C18.72 17.31 18.09 17.31 17.7 17.7C17.31 18.09 17.31 18.72 17.7 19.11L22.59 24L17.7 28.89C17.31 29.28 17.31 29.91 17.7 30.3C18.09 30.69 18.72 30.69 19.11 30.3L24 25.41L28.89 30.3C29.28 30.69 29.91 30.69 30.3 30.3C30.69 29.91 30.69 29.28 30.3 28.89L25.41 24L30.3 19.11C30.68 18.73 30.68 18.09 30.3 17.71Z"
									fill="#8D191D"
								/>
							</svg>
							<h3>Выберете город</h3>
						</div>

						{cities && (
							<>
								<CitiesCount cities={cities} />
								<CitiesList cities={cities} />
							</>
						)}
					</div>
				</ModalCard>
			)}
		</>
	);
};
export default CitiesPageDesctop;
