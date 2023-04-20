import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useHeaderLocations } from "domain/use-case/useCaseLocation";

const HeaderLocation = () => {
    const useCaseLocationHeader = adapterComponentUseCase(useHeaderLocations);
    const { selectedPoint } = useCaseLocationHeader.data;
    const {handlerHeader } = useCaseLocationHeader.handlers;

		const h = (q:any) => {
			window.location.href = 'https://хинкалыч.рф'
		
		}

    return (
        <div className="header_adress-info">
            <span onClick={() => h('city')} className="header_adress-info-active">{selectedPoint.city}</span>
            <span onClick={() => h('point')}>{selectedPoint.address}</span>
            <a href={`tel:${selectedPoint.phone}`} className="phones">{selectedPoint.phone}</a>
        </div>
    );
};
export default HeaderLocation;
