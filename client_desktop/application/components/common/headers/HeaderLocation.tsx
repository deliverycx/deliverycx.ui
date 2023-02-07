import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useHeaderLocations } from "domain/use-case/useCaseLocation";

const HeaderLocation = () => {
    const useCaseLocationHeader = adapterComponentUseCase(useHeaderLocations);
    const { selectedPoint } = useCaseLocationHeader.data;
    const {handlerHeader } = useCaseLocationHeader.handlers;

		const rend = (querty:string) =>{
			window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT as string}/?location=${querty}`
		}

    return (
        <div className="header_adress-info">
						{
							/**
						 
						 <span onClick={() => handlerHeader('city')} className="header_adress-info-active">{selectedPoint.city}</span>
            <span onClick={() => handlerHeader('point')}>{selectedPoint.address}</span>
							 */
						}
						<span onClick={() => rend('city')} className="header_adress-info-active">{selectedPoint.city}</span>
            <span onClick={() => rend('point')}>{selectedPoint.address}</span>
						
            


            <a href={`tel:${selectedPoint.phone}`} className="phones">{selectedPoint.phone}</a>
        </div>
    );
};
export default HeaderLocation;
