import { useOutside } from "application/hooks/useOutside";
import { FC, RefObject, useRef, useState } from "react"
import cn from "classnames";
import { IPayment } from "@types";
import FormFieldWrapper from "./FormFieldWrapper";
import { CartFormMetods } from "application/components/core/Cart/HOC_CartForm/CartMetods";

type IProps ={
  options: IPayment[],
  selected: IPayment,
  setter: any
}
const FormSelect:FC<IProps> = ({ options, selected, setter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef() as RefObject<HTMLDivElement> | null;

    const dynamycCN = (value: string)=>cn(value, {open: isOpen});

    const openToggle = ()=>{
        setIsOpen(isOpen ? false : true);
    }
    const valueClickHandler = (option: IPayment)=>{
        setter(option);
        openToggle();
    }

    useOutside(ref, openToggle, isOpen);

		const img = (selected:string) =>
				CartFormMetods.paymentsMetod[0].id === selected ? <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
				<path d="M14.4 11.8749H1.59999C1.45854 11.8749 1.32289 11.8178 1.22287 11.7163C1.12285 11.6147 1.06666 11.4769 1.06666 11.3332C1.06666 11.1896 1.12285 11.0518 1.22287 10.9502C1.32289 10.8487 1.45854 10.7916 1.59999 10.7916H14.4C14.5414 10.7916 14.6771 10.8487 14.7771 10.9502C14.8771 11.0518 14.9333 11.1896 14.9333 11.3332C14.9333 11.4769 14.8771 11.6147 14.7771 11.7163C14.6771 11.8178 14.5414 11.8749 14.4 11.8749Z" />
				<path d="M13.3334 13.5H2.66674C2.52529 13.5 2.38963 13.4429 2.28961 13.3414C2.1896 13.2398 2.1334 13.102 2.1334 12.9583C2.1334 12.8147 2.1896 12.6769 2.28961 12.5753C2.38963 12.4737 2.52529 12.4167 2.66674 12.4167H13.3334C13.4749 12.4167 13.6105 12.4737 13.7105 12.5753C13.8106 12.6769 13.8667 12.8147 13.8667 12.9583C13.8667 13.102 13.8106 13.2398 13.7105 13.3414C13.6105 13.4429 13.4749 13.5 13.3334 13.5Z" />
				<path d="M0.533333 7.54209H0V9.16707C0 9.45438 0.112381 9.72993 0.312419 9.93309C0.512458 10.1362 0.783769 10.2504 1.06667 10.2504H2.66667V9.70872C2.66605 9.13429 2.44109 8.58356 2.04115 8.17738C1.6412 7.77119 1.09894 7.54272 0.533333 7.54209Z" />
				<path d="M15.4667 6.45825H16V4.29161H15.4667C14.6183 4.29063 13.8049 3.94791 13.205 3.33864C12.6051 2.72936 12.2676 1.9033 12.2667 1.04166V0.5H3.73333V1.04166C3.73236 1.9033 3.39491 2.72936 2.795 3.33864C2.1951 3.94791 1.38173 4.29063 0.533333 4.29161H0V6.45825C0.166667 6.45825 0.344667 6.45825 0.533333 6.45825C1.38173 6.45924 2.1951 6.80196 2.795 7.41123C3.39491 8.0205 3.73236 8.84657 3.73333 9.7082V10.2499H12.2667V9.7082C12.2676 8.84657 12.6051 8.0205 13.205 7.41123C13.8049 6.80196 14.6183 6.45924 15.4667 6.45825ZM8 8.62489C7.3671 8.62489 6.74841 8.43428 6.22218 8.07717C5.69594 7.72006 5.28579 7.21249 5.04359 6.61864C4.80139 6.02478 4.73801 5.37133 4.86149 4.7409C4.98496 4.11047 5.28973 3.53138 5.73726 3.07687C6.18479 2.62235 6.75497 2.31282 7.37571 2.18742C7.99645 2.06202 8.63986 2.12638 9.22459 2.37237C9.80931 2.61835 10.3091 3.0349 10.6607 3.56935C11.0123 4.10381 11.2 4.73215 11.2 5.37493C11.199 6.23657 10.8616 7.06264 10.2617 7.67191C9.66176 8.28118 8.8484 8.6239 8 8.62489Z" />
				<path d="M7.99996 7.54177C9.17817 7.54177 10.1333 6.57173 10.1333 5.37513C10.1333 4.17853 9.17817 3.2085 7.99996 3.2085C6.82175 3.2085 5.86663 4.17853 5.86663 5.37513C5.86663 6.57173 6.82175 7.54177 7.99996 7.54177Z" />
				<path d="M13.3332 9.70872V10.2504H14.9332C15.2161 10.2504 15.4875 10.1362 15.6875 9.93309C15.8875 9.72993 15.9999 9.45438 15.9999 9.16707V7.54209H15.4666C14.901 7.54272 14.3587 7.77119 13.9588 8.17738C13.5588 8.58356 13.3339 9.13429 13.3332 9.70872Z" />
				<path d="M15.4666 3.2083H15.9999V1.58332C15.9999 1.296 15.8875 1.02046 15.6875 0.817296C15.4875 0.614135 15.2161 0.5 14.9332 0.5H13.3332V1.04166C13.3339 1.61609 13.5588 2.16682 13.9588 2.57301C14.3587 2.9792 14.901 3.20767 15.4666 3.2083Z" />
				<path d="M2.66667 1.04166V0.5H1.06667C0.783769 0.5 0.512458 0.614135 0.312419 0.817296C0.112381 1.02046 0 1.296 0 1.58332V3.2083H0.533333C1.09894 3.20767 1.6412 2.9792 2.04115 2.57301C2.44109 2.16682 2.66605 1.61609 2.66667 1.04166Z" />
			</svg> :
				CartFormMetods.paymentsMetod[1].id === selected ? <svg width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 9.93189C0 10.4804 0.210714 11.0064 0.585786 11.3943C0.960859 11.7821 1.46957 12 2 12H14C14.5304 12 15.0391 11.7821 15.4142 11.3943C15.7893 11.0064 16 10.4804 16 9.93189V4.24461H0V9.93189ZM2.35714 7.12518C2.35714 6.83134 2.47003 6.54954 2.67096 6.34177C2.87189 6.13399 3.14441 6.01727 3.42857 6.01727H5.14286C5.42702 6.01727 5.69954 6.13399 5.90047 6.34177C6.1014 6.54954 6.21429 6.83134 6.21429 7.12518V7.86379C6.21429 8.15763 6.1014 8.43943 5.90047 8.6472C5.69954 8.85498 5.42702 8.9717 5.14286 8.9717H3.42857C3.14441 8.9717 2.87189 8.85498 2.67096 8.6472C2.47003 8.43943 2.35714 8.15763 2.35714 7.86379V7.12518Z"/>
				<path d="M14 0H2C1.46957 0 0.960859 0.217889 0.585786 0.605734C0.210714 0.993579 0 1.51961 0 2.0681V3.0283H16V2.0681C16 1.51961 15.7893 0.993579 15.4142 0.605734C15.0391 0.217889 14.5304 0 14 0Z" />
			</svg> :
				CartFormMetods.paymentsMetod[2].id === selected ? <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M8.99999 14.139L0 10.0497V0.700195L8.99999 4.96427L18 0.700195V10.0322L8.99999 14.139ZM0.873789 9.47301L8.99999 13.1604L17.1437 9.47301V2.08077L9.0175 5.92542L0.873789 2.08077V9.47301Z" fill="#026E8C"/>
			</svg> : "card-red.svg"

    return (
        <div className="form__field__type payment_section" onClick={openToggle} ref={ref}>
						<FormFieldWrapper
		          addfild="addfild"
		        >
		          <div className="adress_fild__address payment-item_box payactive">
								<section className="payment-item_box--name">
								<div className="form__field-wrapper__placeholder__ico">
									{img(selected.id)}
                </div>
								{selected.value}
								</section>
								<img src={`images/i/ok-icon.png`} width="15" height="12" alt="" />
							</div>
		        </FormFieldWrapper>
						
            
							<div className={dynamycCN("payment_list")}>
            
                {
                    options.map((option:IPayment) => {
                        const CN = cn("payment_list-item", {active: selected.id === option.id})

                        return <div key={option.id} className={CN} onClick={() => valueClickHandler(option)}>
													
													<div className="payment-item_box">
														<section className="payment-item_box--name">
														<div className="form__field-wrapper__placeholder__ico">
						                 	
															 {img(option.id)}
						                </div>
														{option.value}
														</section>
														<img className="payment_ok" src={`images/i/ok-icon.png`} width="15" height="12" alt="" />
													</div>

													</div>
                    })
                }
							</div>	

        </div>
    )
}
export default FormSelect