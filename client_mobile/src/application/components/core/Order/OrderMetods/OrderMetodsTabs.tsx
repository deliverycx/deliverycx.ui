import { DELIVERY_METODS } from "application/contstans/const.orgstatus";
import { useOrganizationStatus } from "application/hooks/useOrganizationStatus";
import { observer } from "mobx-react-lite";
import { IDeliveryTypes } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type"
import { organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { FC, useEffect } from 'react';

const OrderMetodsTabs: FC<{ deliveryTabs: IDeliveryTypes[] }> = ({ deliveryTabs }) => {
	const [statusTSX, switchMetod] = useOrganizationStatus()


	const handlerSwitchTab = (tab: IDeliveryTypes) => {
		if (statusTSX.NoTimeWork()) {
			return
		} else {
			useCaseOrganizationStatus.selectDeliveryMetod(tab)
		}

	}

	return (
		<div className="order-placement__tabs">
			<div className="form-radio">
				<label>Способ получения</label>

				<div className="form-radio__toggle">
					{
						deliveryTabs && deliveryTabs.length &&
						deliveryTabs.map((tab) => {
							if (statusTSX.ONTimeWork()) {
								if(tab.metod !== DELIVERY_METODS.COURIER)
								return (
									<div key={tab.metod} onClick={() => handlerSwitchTab(tab)} className="form-radio__toggle__item">
										<input type="radio" name="delivery" checked={tab.active} />
										<div className="form-radio__toggle__item-tab">
											{tab.name}
										</div>
									</div>
								)
							} else {
								return (
									<div key={tab.metod} onClick={() => handlerSwitchTab(tab)} className="form-radio__toggle__item">
										<input type="radio" name="delivery" checked={tab.active} />
										<div className="form-radio__toggle__item-tab">
											{tab.name}
										</div>
									</div>
								)
							}

						})
					}


				</div>
			</div>
		</div>
	)
}
export default observer(OrderMetodsTabs)