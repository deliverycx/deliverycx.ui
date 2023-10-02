import { observer } from "mobx-react-lite";
import { IDeliveryTypes } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type"
import { organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { FC, useEffect } from 'react';

const OrderMetodsTabs:FC<{deliveryTabs:IDeliveryTypes[]}> = ({deliveryTabs}) => {
	
	return (
		<div className="order-placement__tabs">
			<div className="form-radio">
				<label>Способ получения</label>

				<div className="form-radio__toggle">
					{
						deliveryTabs && deliveryTabs.length &&
						deliveryTabs.map((tab) => {
							return (
								<div key={tab.metod} onClick={()=> useCaseOrganizationStatus.selectDeliveryMetod(tab)} className="form-radio__toggle__item">
									<input type="radio" name="delivery" checked={tab.active} />
									<div className="form-radio__toggle__item-tab">
										{tab.name}
									</div>
								</div>
							)
						})
					}

					
				</div>
			</div>
		</div>
	)
}
export default observer(OrderMetodsTabs)