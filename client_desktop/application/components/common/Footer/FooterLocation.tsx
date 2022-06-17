import { adapterComponentUseCase } from "../../../../adapters/adapterComponents";
import { useHeaderLocations } from "../../../../domain/use-case/useCaseLocation";

const FooterLocation = () => {
    const useCaseLocationHeader = adapterComponentUseCase(useHeaderLocations);
    const { social,selectedPoint } = useCaseLocationHeader.data;
    const {handlerHeader } = useCaseLocationHeader.handlers;

    return (
        <div className="header_adress-info" onClick={handlerHeader}>
            <div className="footer_box-title">{selectedPoint.city}</div>
            <div className="footer_box_address_line">{selectedPoint.address}</div>
            <div className="footer_box_address_line phones">{selectedPoint.phone}</div>
            <div className="socialbox">
					 {Object.keys(selectedPoint).length !== 0 &&
               
                    <a href="https://t.me/starikhinkalych" target="_blank" rel="noreferrer">
                        <svg width="30" height="30" className="tg" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.59926 15.9536C6.59777 15.9531 6.59628 15.9526 6.59479 15.9521C6.59394 15.9519 6.59308 15.9516 6.59223 15.9513C5.63648 15.6495 4.93463 15.4278 5.00489 14.8648C5.04647 14.5317 5.50315 14.191 6.37494 13.8428C6.40548 13.8294 6.43596 13.8161 6.46638 13.8028C6.47199 13.8003 6.4776 13.7979 6.48322 13.7954C11.7918 11.4725 15.3357 9.93933 17.1149 9.19601C22.2293 7.05927 23.292 6.68809 23.9847 6.6757C24.137 6.67314 24.4776 6.71106 24.6983 6.8909C24.8846 7.04276 24.9359 7.24789 24.9604 7.39186C24.9849 7.53584 25.0155 7.86381 24.9912 8.12008C24.714 11.0451 23.5148 18.1434 22.9047 21.4195C22.6466 22.8058 22.1382 23.2706 21.6461 23.316C20.7992 23.3943 20.1137 22.9034 19.3507 22.357C19.1502 22.2134 18.9443 22.066 18.7287 21.9241C17.8826 21.367 17.2287 20.9196 16.573 20.4711C15.9726 20.0605 15.3709 19.6488 14.6188 19.151C13.0539 18.1152 13.709 17.4809 14.5826 16.635C14.627 16.5919 14.6721 16.5483 14.7174 16.504C14.8163 16.4076 14.9165 16.3082 15.0155 16.2049C15.08 16.1377 15.3952 15.8433 15.8397 15.4282C16.6643 14.6581 17.9337 13.4727 18.8709 12.5525C19.2493 12.181 19.5735 11.8526 19.7925 11.6123C19.9688 11.4188 20.0769 11.2823 20.09 11.2263C20.1014 11.1775 20.112 10.9954 20.0043 10.8993C19.8966 10.8031 19.7377 10.836 19.623 10.8622C19.5941 10.8688 19.4884 10.9286 19.3059 11.0416C19.0702 11.1876 18.7064 11.4224 18.2144 11.746C17.2104 12.4064 15.6726 13.4368 13.6012 14.8371C13.5505 14.8714 13.4994 14.9059 13.4481 14.9406C12.9474 15.2792 12.4164 15.6388 11.8549 16.0195C11.1199 16.5264 10.4542 16.7734 9.85775 16.7605C9.2002 16.7462 7.93533 16.387 6.99502 16.08C6.85942 16.0357 6.72709 15.9939 6.59926 15.9536ZM11.7044 18.3878C11.7497 18.6788 11.8438 18.9736 11.9952 19.2648C12.3575 19.9618 12.9594 20.4585 13.5183 20.8285C14.2575 21.3178 14.8482 21.7219 15.4496 22.1332L15.5303 22.1884C16.16 22.6191 16.8063 23.0603 17.6323 23.6042C17.8123 23.7228 17.9813 23.8437 18.1805 23.9863C18.2231 24.0168 18.2671 24.0483 18.3129 24.081C18.5532 24.2524 18.8471 24.4593 19.1618 24.645C19.8026 25.0232 20.7046 25.4205 21.8294 25.3165C23.755 25.1385 24.5768 23.3665 24.8706 21.7889C25.4794 18.5199 26.6953 11.3378 26.9822 8.31042C27.0281 7.8257 26.9758 7.31148 26.9317 7.05298C26.8858 6.7837 26.7287 5.95868 25.9585 5.33093C25.5304 4.98201 25.0735 4.83128 24.7808 4.76101C24.4753 4.68766 24.1839 4.66314 23.9511 4.66705L23.9491 4.66709C23.2435 4.67971 22.5334 4.88347 21.5257 5.25079C20.4835 5.63066 18.8967 6.2758 16.3468 7.34113C14.5407 8.09571 10.9548 9.64728 5.60433 11.9887C5.1072 12.1891 4.60586 12.4336 4.18615 12.7467C3.80975 13.0274 3.14371 13.6271 3.02042 14.6149C2.93035 15.3367 3.14275 16.0137 3.5686 16.5394C3.93076 16.9865 4.37738 17.2388 4.66565 17.379C5.09058 17.5858 5.66786 17.767 6.09652 17.9016C6.2 17.934 6.29482 17.9638 6.37675 17.9906C6.8743 18.153 7.47181 18.334 8.04596 18.4786C8.57369 18.6116 9.24297 18.7566 9.81455 18.769C10.4796 18.7834 11.1132 18.6345 11.7044 18.3878ZM6.39047 13.753C6.39074 13.7529 6.39576 13.7554 6.40471 13.7607C6.39466 13.7557 6.39019 13.7531 6.39047 13.753ZM6.57102 15.9723C6.57127 15.9721 6.5716 15.9719 6.57202 15.9716C6.56994 15.9732 6.56953 15.9734 6.57102 15.9723Z"/>
                        </svg>
                    </a>
                
								
            }
						{
									social &&
									<a href={social.social.vk} target="_blank" rel="noreferrer">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M26.435 8.79999C26.613 8.23599 26.435 7.82599 25.6475 7.82599H23.029C22.3685 7.82599 22.0635 8.18499 21.8855 8.56899C21.8855 8.56899 20.5385 11.849 18.6575 13.9755C18.0475 14.5905 17.768 14.7955 17.4375 14.7955C17.2595 14.7955 17.0305 14.5905 17.0305 14.027V8.77349C17.0305 8.10749 16.8275 7.79999 16.268 7.79999H12.15C11.743 7.79999 11.489 8.10749 11.489 8.41499C11.489 9.05549 12.4295 9.20949 12.531 11.003V14.9C12.531 15.7455 12.381 15.9 12.048 15.9C11.1585 15.9 8.99801 12.5945 7.70201 8.82799C7.45001 8.08199 7.19401 7.79999 6.533 7.79999H3.8895C3.127 7.79999 3 8.15849 3 8.54299C3 9.23499 3.8895 12.7195 7.14301 17.3315C9.30351 20.4815 12.379 22.1745 15.1495 22.1745C16.8275 22.1745 17.0305 21.79 17.0305 21.1495V18.7665C17.0305 17.998 17.183 17.87 17.717 17.87C18.098 17.87 18.7845 18.0745 20.335 19.5865C22.114 21.38 22.419 22.2 23.4105 22.2H26.0285C26.791 22.2 27.147 21.8155 26.9435 21.0725C26.715 20.3295 25.8505 19.2535 24.732 17.9725C24.122 17.2555 23.207 16.461 22.9275 16.0765C22.5465 15.564 22.648 15.359 22.9275 14.898C22.902 14.898 26.105 10.337 26.435 8.79799" fill="white"/>
												</svg>

                    </a>
								}

							</div>	
        </div>
    );
};
export default FooterLocation;
