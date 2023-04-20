import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useHeaderLocations } from "domain/use-case/useCaseLocation";

const HeaderLocation = () => {
    const useCaseLocationHeader = adapterComponentUseCase(useHeaderLocations);
    const { selectedPoint } = useCaseLocationHeader.data;
    const {handlerHeader } = useCaseLocationHeader.handlers;

		const h = (q:any) => {
			if(process.env.NODE_ENV === 'production'){
				window.location.href = 'https://%D0%B4%D0%B5%D1%81%D0%BA%D1%82%D0%BE%D0%BF.%D1%85%D0%B8%D0%BD%D0%BA%D0%B0%D0%BB%D1%8B%D1%87.%D1%80%D1%84'
			}
		
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
