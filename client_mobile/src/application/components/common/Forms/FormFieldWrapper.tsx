import cn from "classnames";
import { FC, memo, PropsWithChildren, ReactNode } from "react";
import {isEqual} from "lodash";

interface IProps{
    placeholderIco?: string,
    placeholderValue?: string,
    isValid?: any,
    error?: boolean,
    errorValue?: string,
    addfild?:any
		children:ReactNode
}

const FormFieldWrapper: FC<IProps> = ({ placeholderIco, placeholderValue, children, isValid, error,errorValue,addfild }) => {
    const validCN = cn("input__item input_icon", {
        "not-valid": isValid !== undefined ? isValid : false,
        "error": error !== undefined ? error : false,
        [addfild]: addfild
    });
    return (
        <div className={validCN}>
            
							{
								placeholderIco &&
								
								<div className="form__field-wrapper__placeholder">
                    <div className="form__field-wrapper__placeholder__ico">
                        <img src={placeholderIco} alt="" />
                    </div>
                </div>
							}
                
                {children}
            
            {
                error &&
                <div className="form__field-wrapper__error">
                    {errorValue}
                </div>
            }
        </div>
    );
}

export default FormFieldWrapper;
