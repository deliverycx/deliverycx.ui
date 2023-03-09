import cn from "classnames";
import { FC, memo, PropsWithChildren } from "react";
import {isEqual} from "lodash";

interface IProps{
    placeholderIco: string,
    placeholderValue: string,
    isValid?: boolean,
    error?: boolean,
    errorValue?: string,
    addfild?:any
}

const FormFieldWrapper: FC<IProps> = ({ placeholderIco, placeholderValue, children, isValid, error,errorValue,addfild }) => {
    const validCN = cn("form__field-wrapper", {
        "not-valid": isValid !== undefined ? isValid : false,
        "error": error !== undefined ? error : false,
        [addfild]: addfild
    });
    return (
        <div className={validCN}>
            <div className="row form__field-wrapper__address">
                <div className="form__field-wrapper__placeholder">
                    <div className="form__field-wrapper__placeholder__ico">
                        <img src={placeholderIco} alt="" />
                    </div>
                </div>
                {children}
            </div>
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
