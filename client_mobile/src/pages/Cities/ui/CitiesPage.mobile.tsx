import { useCitiesQuery } from 'entities/cities/queries/cities.query';
import CitiesCount from 'widgets/Cities/CitiesCount/ui/CitiesCount';
import CitiesList from 'widgets/Cities/CitiesList/ui/CitiesList';

const CitiesPageMobile = () => {
	const { data: cities } = useCitiesQuery();
	return (
		<>
			<div className="select__header">
				<img src={require('assets/images/logo.jpg')} alt="Старик Хинкалыч" />
			</div>
			{cities && (
				<>
					<CitiesCount cities={cities} />
					<CitiesList cities={cities} />
				</>
			)}
		</>
	);
};
export default CitiesPageMobile;
