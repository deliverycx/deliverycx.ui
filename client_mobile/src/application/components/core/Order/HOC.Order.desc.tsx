import { useOrganizationStatus } from "application/hooks/useOrganizationStatus"
import { basketUseCase } from "modules/BasketModule/basket.module"
import { organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import HOCOrderMetods from "./OrderMetods/HOC.OrderMetods"
import HOCOrderForm from "./OrderForm/HOC.OrderForm"
import LayoutDesctop from "application/components/common/Layout/LayoutDesctop"
import cn from "classnames"

const HOCOrderDesc = () => {
	const navigate = useNavigate()
	const [statusTSX, switchMetod] = useOrganizationStatus()
	const { paymentMetod } = organizationStatusModel

	useQuery('pointstatus', () => useCaseOrganizationStatus.statusOrganization(), {
		refetchOnWindowFocus: true,
	})

	useEffect(() => {
		basketUseCase.cartCase()
	}, [])

	const CN = cn("order-placement__form", { 'close-soon': statusTSX.NoTimeWork() })
	return (
		<LayoutDesctop>
			<div className="order-desc">
				<h1>Оформление заказа</h1>
				<div className={CN}>
					{
						paymentMetod &&
						<HOCOrderForm paymentMetod={paymentMetod} />
					}
				</div>
			</div>
		</LayoutDesctop>
	)
}
export default HOCOrderDesc