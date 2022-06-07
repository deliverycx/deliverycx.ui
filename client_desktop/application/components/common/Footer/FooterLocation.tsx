import { adapterComponentUseCase } from "../../../../adapters/adapterComponents";
import { useHeaderLocations } from "../../../../domain/use-case/useCaseLocation";

const FooterLocation = () => {
    const useCaseLocationHeader = adapterComponentUseCase(useHeaderLocations);
    const { selectedPoint } = useCaseLocationHeader.data;
    const {handlerHeader } = useCaseLocationHeader.handlers;

    return (
        <div className="header_adress-info" onClick={handlerHeader}>
            <div className="footer_box-title">{selectedPoint.city}</div>
            <div className="footer_box_address_line">{selectedPoint.address}</div>
            <div className="footer_box_address_line phones">{selectedPoint.phone}</div>
            {Object.keys(selectedPoint).length !== 0 &&
                <div>
                    <a href="https://t.me/starikhinkalych" target="_blank" rel="noreferrer">
                        <img className="tg" src="/images/icon/tg-plane.png" alt="" />
                    </a>
                </div>
            }
        </div>
    );
};
export default FooterLocation;
