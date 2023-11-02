import { IOrderOnspotTable } from "modules/OrderModule/interfaces/order.type";
import { FC, useState } from "react";
import cn from "classnames"
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import ModalCard from "application/components/common/Modals/ModalCard";
import { NavLink } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';

type IProps = { onSpotTable: IOrderOnspotTable, set: any, organization: IOrganization }

const OrderOnspotSelect: FC<IProps> = ({ onSpotTable, organization, set }) => {
	const [select, setSelect] = useState(false)
	const [modal, setModal] = useState(false)
	const [selectTable, setSelectTable] = useState<IOrderOnspotTable>(onSpotTable)

	const handlTable = (table: IOrderOnspotTable) => {
		setSelectTable(table)
		setSelect(false)
		set(table)
	}

	return (
		<div className="d-flex flex-center gap-8">
			<div className="input__item input_icon input_icon_left input_icon_right flex-big">
				<label htmlFor="adresses-institut">Адрес заведения</label>
				<div className="input__container">
					<img src={require("assets/images/icons/location_gray_999.png")} alt="" />
					<input readOnly value={organization.info.address} onClick={() => setModal(true)} name="adresses-institut" type="" />

				</div>
			</div>
			<div className="input__item input_icon input_icon_right flex-small">
				<label htmlFor="table">Столик</label>
				<div className="input__container" onClick={() => setSelect(prev => !prev)}>
					<input readOnly value={selectTable.numb} name="table" type="number" />
					<img src={require("assets/images/icons/keyboard_arrow_down_gray_999.png")} alt="" />
				</div>
				{
					select && onSpotTable &&
					<div className="onspot_select">
						{
							onSpotTable.tables.map((val: any) => {
								const active = cn("onspot_select_item", {
									active: selectTable.id === val.id
								});
								return <div key={val.id} className={active} onClick={() => handlTable({
									section: onSpotTable.id,
									id: val.id,
									numb: val.number,
									tables: onSpotTable.tables
								})}>{val.number}</div>
							})
						}
					</div>
				}
			</div>
			{modal &&
				<ModalCard setIsOpened={setModal}>
					<div className="modal modal-order-placement">
						<div className="modal__wrapper">
							<div className="modal__header justify-between">
								<div className="d-flex flex-center justify-between">
									<div onClick={() => setModal(false)} className="d-flex flex-center justify-center modal__btn no-drag">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M19 11.0002H7.82998L12.71 6.12021C13.1 5.73021 13.1 5.09021 12.71 4.70021C12.32 4.31021 11.69 4.31021 11.3 4.70021L4.70998 11.2902C4.31998 11.6802 4.31998 12.3102 4.70998 12.7002L11.3 19.2902C11.69 19.6802 12.32 19.6802 12.71 19.2902C13.1 18.9002 13.1 18.2702 12.71 17.8802L7.82998 13.0002H19C19.55 13.0002 20 12.5502 20 12.0002C20 11.4502 19.55 11.0002 19 11.0002Z" fill="#8D191D" />
										</svg>
									</div>
									<h3>Адрес заведения</h3>
								</div>
							</div>
							<div className="modal__content gap-8">
								<h3>
									Ваша корзина наполнена блюдами, которые точно есть в наличии по адресу:
								</h3>
								<h4>
									{organization.info.address}
								</h4>
								<small>
									Если вы хотите изменить заведение вам нужно будет заново заполнить корзину. Продолжить?
								</small>
								<NavLink to={ROUTE_APP.MAIN} className="btn btn-sm btn-red no-drag">
									Другое заведение
								</NavLink>
								<button onClick={() => setModal(false)} className="btn btn-sm btn-gray no-drag">
									Назад
								</button>
							</div>
						</div>
					</div>
				</ModalCard>
			}
		</div>
	)
}
export default OrderOnspotSelect