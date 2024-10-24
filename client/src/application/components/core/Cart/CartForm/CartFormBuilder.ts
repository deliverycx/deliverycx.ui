import { IWrapper } from "application/components/common/Forms/FormWrapper";
import { ICartFormMetods } from "./CartMetods";

export class FormBuilderCart {
    static delivery(metods: ICartFormMetods) {
        return (builder: any): IWrapper[] => {
            return [
                //builder.paymentPopup(),
                //builder.payment(metods.paymentsMetod),
								builder.selectdeliv(),
                builder.adress(),
                builder.name(),
                builder.phone(),
								builder.comment()
            ];
        };
    }
    static pickup(metods: ICartFormMetods) {
        return (builder: any): IWrapper[] => {
            return [
                //builder.paymentPopup(),
                //builder.payment(metods.paymentsMetod),
                //builder.adress(),
                builder.name(),
                builder.phone(),
								builder.comment()
            ];
        };
    }
		static onspot(metods: ICartFormMetods) {
			return (builder: any): IWrapper[] => {
					return [
							builder.paymentPopup(),
							//builder.payment(metods.paymentsMetod),
							//builder.adress(),
							builder.name(),
							builder.phone()
					];
			};
		}
}
