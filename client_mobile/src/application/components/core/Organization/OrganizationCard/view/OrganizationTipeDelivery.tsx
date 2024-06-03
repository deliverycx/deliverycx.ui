/* eslint-disable react/no-unknown-property */
import { IDeliveryTypes, IOrganizationStatus } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type"
import { FC, useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { ROUTE_APP } from 'application/contstans/route.const';
import { DELIVERY_METODS, ORG_STATUS } from "application/contstans/const.orgstatus";

import iconDelivery from "assets/images/icons/moped.png";
import iconSelfPickup from "assets/images/icons/self_pickup.png";
import iconTableRestaurant from "assets/images/icons/table_restaurant.png";
import iconQrCodeScanner from "assets/images/icons/qr_code_scanner.png";
import { useOrganizationStatus } from "application/hooks/useOrganizationStatus";
import { observer } from "mobx-react-lite";
import { PointsContext } from "../HOC.OrganizationCard";
import _ from "lodash";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { appUseCase } from "modules/AppModule/app.module";
import { Redirects } from "application/helpers/redirectsOld";
import { isDesctomMediaQuery } from "application/ResponseMedia";
import OrganizationTableRestaurant from "./OrganizationTableRestaurant";



const OrganizationTipeDelivery: FC<{ organization: any }> = ({ organization }) => {
	const useCasePoints = useContext(PointsContext)
	const { handlerSelectMenu,handlerSelectDeliveryTipe } = useCasePoints.handlers
	const navigate = useNavigate()


	
	const [statusTSX, switchMetod] = useOrganizationStatus(organization)

	useEffect(() => {
		if (!Array.isArray(organization.deliveryTipe) || organization.deliveryTipe.length === 0) {
			navigate(ROUTE_APP.MAIN)
		}
	}, [organization.deliveryTipe])

	function subtract30Minutes(timeString: string): string {
    // Разбиваем строку на часы и минуты
    const timeParts: string[] = timeString.split(":");
    let hours: number = parseInt(timeParts[0]);
    let minutes: number = parseInt(timeParts[1]);

    // Вычитаем 30 минут
    minutes -= 30;

    // Обработка случая, когда минуты становятся отрицательными
    if (minutes < 0) {
        // Уменьшаем часы на 1 и добавляем 60 минут
        hours -= 1;
        minutes += 60;
    }

    // Форматируем часы и минуты обратно в строку
    const newTimeString: string = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');

    return newTimeString;
}

	console.log(organization.redirect.redirectON);
	
	statusTSX && statusTSX.NoWorkPoint((
		<>
			<button disabled className="btn btn-mini btn-gray no-drag">
				<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.83323 14C3.64434 14 3.47212 13.9417 3.31656 13.825C3.16101 13.7084 3.05545 13.5556 2.99989 13.3667L1.13323 6.63337C1.07767 6.47782 1.10267 6.33337 1.20823 6.20004C1.31378 6.06671 1.45545 6.00004 1.63323 6.00004H4.99989L7.93323 1.63337C7.98878 1.54449 8.06656 1.47226 8.16656 1.41671C8.26656 1.36115 8.37212 1.33337 8.48323 1.33337C8.59434 1.33337 8.6999 1.36115 8.7999 1.41671C8.8999 1.47226 8.97767 1.54449 9.03323 1.63337L11.9666 6.00004H15.3666C15.5443 6.00004 15.686 6.06671 15.7916 6.20004C15.8971 6.33337 15.9221 6.47782 15.8666 6.63337L13.9999 13.3667C13.9443 13.5556 13.8388 13.7084 13.6832 13.825C13.5277 13.9417 13.3555 14 13.1666 14H3.83323ZM8.4999 11.3334C8.86656 11.3334 9.18045 11.2028 9.44156 10.9417C9.70267 10.6806 9.83323 10.3667 9.83323 10C9.83323 9.63337 9.70267 9.31949 9.44156 9.05837C9.18045 8.79726 8.86656 8.66671 8.4999 8.66671C8.13323 8.66671 7.81934 8.79726 7.55823 9.05837C7.29712 9.31949 7.16656 9.63337 7.16656 10C7.16656 10.3667 7.29712 10.6806 7.55823 10.9417C7.81934 11.2028 8.13323 11.3334 8.4999 11.3334ZM6.61656 6.00004H10.3666L8.48323 3.20004L6.61656 6.00004Z" fill="#BFBFBF" />
				</svg>
				Онлайн-заказ временно не доступен
			</button>
			<a href={`tel:${organization.info.phone}`} className="btn btn-mini btn-gray  no-drag">
				<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.8 12C10.3667 12 8.96944 11.6806 7.60833 11.0417C6.24722 10.4028 5.04167 9.55833 3.99167 8.50833C2.94167 7.45833 2.09722 6.25278 1.45833 4.89167C0.819444 3.53056 0.5 2.13333 0.5 0.7C0.5 0.5 0.566667 0.333333 0.7 0.2C0.833333 0.0666667 1 0 1.2 0H3.9C4.05556 0 4.19444 0.05 4.31667 0.15C4.43889 0.25 4.51111 0.377778 4.53333 0.533333L4.96667 2.86667C4.98889 3.02222 4.98611 3.16389 4.95833 3.29167C4.93056 3.41944 4.86667 3.53333 4.76667 3.63333L3.16667 5.26667C3.63333 6.06667 4.21667 6.81667 4.91667 7.51667C5.61667 8.21667 6.38889 8.82222 7.23333 9.33333L8.8 7.76667C8.9 7.66667 9.03056 7.59167 9.19167 7.54167C9.35278 7.49167 9.51111 7.47778 9.66667 7.5L11.9667 7.96667C12.1222 8 12.25 8.075 12.35 8.19167C12.45 8.30833 12.5 8.44444 12.5 8.6V11.3C12.5 11.5 12.4333 11.6667 12.3 11.8C12.1667 11.9333 12 12 11.8 12Z" fill="#333333" />
				</svg>
				Заказать по телефону
			</a>
		</>
	))

	statusTSX && statusTSX.SezonNoWork((

		<button disabled className="btn btn-mini btn-gray no-drag">
			<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3.83323 14C3.64434 14 3.47212 13.9417 3.31656 13.825C3.16101 13.7084 3.05545 13.5556 2.99989 13.3667L1.13323 6.63337C1.07767 6.47782 1.10267 6.33337 1.20823 6.20004C1.31378 6.06671 1.45545 6.00004 1.63323 6.00004H4.99989L7.93323 1.63337C7.98878 1.54449 8.06656 1.47226 8.16656 1.41671C8.26656 1.36115 8.37212 1.33337 8.48323 1.33337C8.59434 1.33337 8.6999 1.36115 8.7999 1.41671C8.8999 1.47226 8.97767 1.54449 9.03323 1.63337L11.9666 6.00004H15.3666C15.5443 6.00004 15.686 6.06671 15.7916 6.20004C15.8971 6.33337 15.9221 6.47782 15.8666 6.63337L13.9999 13.3667C13.9443 13.5556 13.8388 13.7084 13.6832 13.825C13.5277 13.9417 13.3555 14 13.1666 14H3.83323ZM8.4999 11.3334C8.86656 11.3334 9.18045 11.2028 9.44156 10.9417C9.70267 10.6806 9.83323 10.3667 9.83323 10C9.83323 9.63337 9.70267 9.31949 9.44156 9.05837C9.18045 8.79726 8.86656 8.66671 8.4999 8.66671C8.13323 8.66671 7.81934 8.79726 7.55823 9.05837C7.29712 9.31949 7.16656 9.63337 7.16656 10C7.16656 10.3667 7.29712 10.6806 7.55823 10.9417C7.81934 11.2028 8.13323 11.3334 8.4999 11.3334ZM6.61656 6.00004H10.3666L8.48323 3.20004L6.61656 6.00004Z" fill="#BFBFBF" />
			</svg>
			Временно не работает (не сезон)
		</button>
	))

	statusTSX && statusTSX.OpenPoint((
		<button disabled className="btn btn-mini btn-gray no-drag">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.33333 14.6667C2.96667 14.6667 2.65278 14.5362 2.39167 14.275C2.13056 14.0139 2 13.7 2 13.3334V4.00004C2 3.63337 2.13056 3.31949 2.39167 3.05837C2.65278 2.79726 2.96667 2.66671 3.33333 2.66671H4V2.00004C4 1.81115 4.06389 1.65282 4.19167 1.52504C4.31944 1.39726 4.47778 1.33337 4.66667 1.33337C4.85556 1.33337 5.01389 1.39726 5.14167 1.52504C5.26944 1.65282 5.33333 1.81115 5.33333 2.00004V2.66671H10.6667V2.00004C10.6667 1.81115 10.7306 1.65282 10.8583 1.52504C10.9861 1.39726 11.1444 1.33337 11.3333 1.33337C11.5222 1.33337 11.6806 1.39726 11.8083 1.52504C11.9361 1.65282 12 1.81115 12 2.00004V2.66671H12.6667C13.0333 2.66671 13.3472 2.79726 13.6083 3.05837C13.8694 3.31949 14 3.63337 14 4.00004V13.3334C14 13.7 13.8694 14.0139 13.6083 14.275C13.3472 14.5362 13.0333 14.6667 12.6667 14.6667H3.33333ZM3.33333 13.3334H12.6667V6.66671H3.33333V13.3334ZM8 9.33337C7.81111 9.33337 7.65278 9.26949 7.525 9.14171C7.39722 9.01393 7.33333 8.8556 7.33333 8.66671C7.33333 8.47782 7.39722 8.31949 7.525 8.19171C7.65278 8.06393 7.81111 8.00004 8 8.00004C8.18889 8.00004 8.34722 8.06393 8.475 8.19171C8.60278 8.31949 8.66667 8.47782 8.66667 8.66671C8.66667 8.8556 8.60278 9.01393 8.475 9.14171C8.34722 9.26949 8.18889 9.33337 8 9.33337ZM5.33333 9.33337C5.14444 9.33337 4.98611 9.26949 4.85833 9.14171C4.73056 9.01393 4.66667 8.8556 4.66667 8.66671C4.66667 8.47782 4.73056 8.31949 4.85833 8.19171C4.98611 8.06393 5.14444 8.00004 5.33333 8.00004C5.52222 8.00004 5.68056 8.06393 5.80833 8.19171C5.93611 8.31949 6 8.47782 6 8.66671C6 8.8556 5.93611 9.01393 5.80833 9.14171C5.68056 9.26949 5.52222 9.33337 5.33333 9.33337ZM10.6667 9.33337C10.4778 9.33337 10.3194 9.26949 10.1917 9.14171C10.0639 9.01393 10 8.8556 10 8.66671C10 8.47782 10.0639 8.31949 10.1917 8.19171C10.3194 8.06393 10.4778 8.00004 10.6667 8.00004C10.8556 8.00004 11.0139 8.06393 11.1417 8.19171C11.2694 8.31949 11.3333 8.47782 11.3333 8.66671C11.3333 8.8556 11.2694 9.01393 11.1417 9.14171C11.0139 9.26949 10.8556 9.33337 10.6667 9.33337ZM8 12C7.81111 12 7.65278 11.9362 7.525 11.8084C7.39722 11.6806 7.33333 11.5223 7.33333 11.3334C7.33333 11.1445 7.39722 10.9862 7.525 10.8584C7.65278 10.7306 7.81111 10.6667 8 10.6667C8.18889 10.6667 8.34722 10.7306 8.475 10.8584C8.60278 10.9862 8.66667 11.1445 8.66667 11.3334C8.66667 11.5223 8.60278 11.6806 8.475 11.8084C8.34722 11.9362 8.18889 12 8 12ZM5.33333 12C5.14444 12 4.98611 11.9362 4.85833 11.8084C4.73056 11.6806 4.66667 11.5223 4.66667 11.3334C4.66667 11.1445 4.73056 10.9862 4.85833 10.8584C4.98611 10.7306 5.14444 10.6667 5.33333 10.6667C5.52222 10.6667 5.68056 10.7306 5.80833 10.8584C5.93611 10.9862 6 11.1445 6 11.3334C6 11.5223 5.93611 11.6806 5.80833 11.8084C5.68056 11.9362 5.52222 12 5.33333 12ZM10.6667 12C10.4778 12 10.3194 11.9362 10.1917 11.8084C10.0639 11.6806 10 11.5223 10 11.3334C10 11.1445 10.0639 10.9862 10.1917 10.8584C10.3194 10.7306 10.4778 10.6667 10.6667 10.6667C10.8556 10.6667 11.0139 10.7306 11.1417 10.8584C11.2694 10.9862 11.3333 11.1445 11.3333 11.3334C11.3333 11.5223 11.2694 11.6806 11.1417 11.8084C11.0139 11.9362 10.8556 12 10.6667 12Z" fill="#BFBFBF" />
</svg>
			Скоро открытие
		</button>

	))

	statusTSX && statusTSX.NoDeliveryPoint((

		<>
			<button disabled className="btn btn-mini btn-gray no-drag">
				<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.83323 14C3.64434 14 3.47212 13.9417 3.31656 13.825C3.16101 13.7084 3.05545 13.5556 2.99989 13.3667L1.13323 6.63337C1.07767 6.47782 1.10267 6.33337 1.20823 6.20004C1.31378 6.06671 1.45545 6.00004 1.63323 6.00004H4.99989L7.93323 1.63337C7.98878 1.54449 8.06656 1.47226 8.16656 1.41671C8.26656 1.36115 8.37212 1.33337 8.48323 1.33337C8.59434 1.33337 8.6999 1.36115 8.7999 1.41671C8.8999 1.47226 8.97767 1.54449 9.03323 1.63337L11.9666 6.00004H15.3666C15.5443 6.00004 15.686 6.06671 15.7916 6.20004C15.8971 6.33337 15.9221 6.47782 15.8666 6.63337L13.9999 13.3667C13.9443 13.5556 13.8388 13.7084 13.6832 13.825C13.5277 13.9417 13.3555 14 13.1666 14H3.83323ZM8.4999 11.3334C8.86656 11.3334 9.18045 11.2028 9.44156 10.9417C9.70267 10.6806 9.83323 10.3667 9.83323 10C9.83323 9.63337 9.70267 9.31949 9.44156 9.05837C9.18045 8.79726 8.86656 8.66671 8.4999 8.66671C8.13323 8.66671 7.81934 8.79726 7.55823 9.05837C7.29712 9.31949 7.16656 9.63337 7.16656 10C7.16656 10.3667 7.29712 10.6806 7.55823 10.9417C7.81934 11.2028 8.13323 11.3334 8.4999 11.3334ZM6.61656 6.00004H10.3666L8.48323 3.20004L6.61656 6.00004Z" fill="#BFBFBF" />
				</svg>
				Здесь не доступен онлайн-заказ
			</button>
			<a href={`tel:${organization.info.phone}`} className="btn btn-mini btn-gray  no-drag">
				<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.8 12C10.3667 12 8.96944 11.6806 7.60833 11.0417C6.24722 10.4028 5.04167 9.55833 3.99167 8.50833C2.94167 7.45833 2.09722 6.25278 1.45833 4.89167C0.819444 3.53056 0.5 2.13333 0.5 0.7C0.5 0.5 0.566667 0.333333 0.7 0.2C0.833333 0.0666667 1 0 1.2 0H3.9C4.05556 0 4.19444 0.05 4.31667 0.15C4.43889 0.25 4.51111 0.377778 4.53333 0.533333L4.96667 2.86667C4.98889 3.02222 4.98611 3.16389 4.95833 3.29167C4.93056 3.41944 4.86667 3.53333 4.76667 3.63333L3.16667 5.26667C3.63333 6.06667 4.21667 6.81667 4.91667 7.51667C5.61667 8.21667 6.38889 8.82222 7.23333 9.33333L8.8 7.76667C8.9 7.66667 9.03056 7.59167 9.19167 7.54167C9.35278 7.49167 9.51111 7.47778 9.66667 7.5L11.9667 7.96667C12.1222 8 12.25 8.075 12.35 8.19167C12.45 8.30833 12.5 8.44444 12.5 8.6V11.3C12.5 11.5 12.4333 11.6667 12.3 11.8C12.1667 11.9333 12 12 11.8 12Z" fill="#333333" />
				</svg>
				Заказать по телефону
			</a>
		</>
	))

	statusTSX && statusTSX.OnliPICKUP((
		<>
			<button disabled className="btn btn-mini btn-gray no-drag">
				Здесь отсутствует доставка
			</button>
			<button onClick={() => handlerSelectDeliveryTipe(DELIVERY_METODS.PICKUP,organization) } className="btn btn-mini btn-gray no-drag">
				<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.49992 6.08968C8.76152 6.08968 8.98546 5.99654 9.17175 5.81025C9.35804 5.62396 9.45118 5.40002 9.45118 5.13842C9.45118 4.87682 9.35804 4.65288 9.17175 4.46659C8.98546 4.2803 8.76152 4.18716 8.49992 4.18716C8.23832 4.18716 8.01438 4.2803 7.82809 4.46659C7.6418 4.65288 7.54866 4.87682 7.54866 5.13842C7.54866 5.40002 7.6418 5.62396 7.82809 5.81025C8.01438 5.99654 8.23832 6.08968 8.49992 6.08968ZM8.49992 10.6676C8.4365 10.6676 8.37308 10.6557 8.30967 10.632C8.24625 10.6082 8.19076 10.5765 8.1432 10.5368C6.98583 9.51423 6.12176 8.56495 5.55101 7.68899C4.98025 6.81304 4.69487 5.99456 4.69487 5.23355C4.69487 4.04447 5.07736 3.09717 5.84233 2.39165C6.6073 1.68613 7.49317 1.33337 8.49992 1.33337C9.50667 1.33337 10.3925 1.68613 11.1575 2.39165C11.9225 3.09717 12.305 4.04447 12.305 5.23355C12.305 5.99456 12.0196 6.81304 11.4488 7.68899C10.8781 8.56495 10.014 9.51423 8.85664 10.5368C8.80908 10.5765 8.75359 10.6082 8.69017 10.632C8.62675 10.6557 8.56334 10.6676 8.49992 10.6676Z" fill="#333333" />
					<path fill-rule="evenodd" clip-rule="evenodd" d="M4.77721 8.86042C5.15538 9.08102 5.28311 9.56641 5.06252 9.94458L3.53832 12.5575H13.4615L11.9373 9.94458C11.7167 9.56641 11.8445 9.08102 12.2226 8.86042C12.6008 8.63982 13.0862 8.76756 13.3068 9.14573L14.9701 11.9971C15.525 12.9483 14.8388 14.1429 13.7375 14.1429H3.26229C2.16103 14.1429 1.47488 12.9483 2.02977 11.9971L3.69305 9.14573C3.91365 8.76756 4.39904 8.63982 4.77721 8.86042Z" fill="#333333" />
				</svg>
				Самовывоз
			</button>
		</>
	))

	statusTSX && statusTSX.NoTimeWork((

		<>
			<button disabled className="btn btn-mini btn-gray no-drag">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4.66665 12.6666C4.11109 12.6666 3.63887 12.4722 3.24998 12.0833C2.86109 11.6944 2.66665 11.2222 2.66665 10.6666H1.99998C1.81109 10.6666 1.65276 10.6028 1.52498 10.475C1.3972 10.3472 1.33331 10.1889 1.33331 9.99998V8.66665C1.33331 7.93331 1.59442 7.30554 2.11665 6.78331C2.63887 6.26109 3.26665 5.99998 3.99998 5.99998H5.99998C6.18887 5.99998 6.3472 6.06387 6.47498 6.19165C6.60276 6.31942 6.66665 6.47776 6.66665 6.66665V9.33331H8.99998L11.3333 6.43331V4.66665H9.99998C9.81109 4.66665 9.65276 4.60276 9.52498 4.47498C9.3972 4.3472 9.33331 4.18887 9.33331 3.99998C9.33331 3.81109 9.3972 3.65276 9.52498 3.52498C9.65276 3.3972 9.81109 3.33331 9.99998 3.33331H11.3333C11.7 3.33331 12.0139 3.46387 12.275 3.72498C12.5361 3.98609 12.6666 4.29998 12.6666 4.66665V6.43331C12.6666 6.58887 12.6416 6.73609 12.5916 6.87498C12.5416 7.01387 12.4722 7.14442 12.3833 7.26665L10.0666 10.1666C9.94442 10.3222 9.78887 10.4444 9.59998 10.5333C9.41109 10.6222 9.21665 10.6666 9.01665 10.6666H6.66665C6.66665 11.2222 6.4722 11.6944 6.08331 12.0833C5.69442 12.4722 5.2222 12.6666 4.66665 12.6666ZM4.66665 11.3333C4.85554 11.3333 5.01387 11.2694 5.14165 11.1416C5.26942 11.0139 5.33331 10.8555 5.33331 10.6666H3.99998C3.99998 10.8555 4.06387 11.0139 4.19165 11.1416C4.31942 11.2694 4.47776 11.3333 4.66665 11.3333ZM3.99998 5.33331C3.81109 5.33331 3.65276 5.26942 3.52498 5.14165C3.3972 5.01387 3.33331 4.85554 3.33331 4.66665C3.33331 4.47776 3.3972 4.31942 3.52498 4.19165C3.65276 4.06387 3.81109 3.99998 3.99998 3.99998H5.99998C6.18887 3.99998 6.3472 4.06387 6.47498 4.19165C6.60276 4.31942 6.66665 4.47776 6.66665 4.66665C6.66665 4.85554 6.60276 5.01387 6.47498 5.14165C6.3472 5.26942 6.18887 5.33331 5.99998 5.33331H3.99998ZM12.6666 12.6666C12.1111 12.6666 11.6389 12.4722 11.25 12.0833C10.8611 11.6944 10.6666 11.2222 10.6666 10.6666C10.6666 10.1111 10.8611 9.63887 11.25 9.24998C11.6389 8.86109 12.1111 8.66665 12.6666 8.66665C13.2222 8.66665 13.6944 8.86109 14.0833 9.24998C14.4722 9.63887 14.6666 10.1111 14.6666 10.6666C14.6666 11.2222 14.4722 11.6944 14.0833 12.0833C13.6944 12.4722 13.2222 12.6666 12.6666 12.6666ZM12.6666 11.3333C12.8555 11.3333 13.0139 11.2694 13.1416 11.1416C13.2694 11.0139 13.3333 10.8555 13.3333 10.6666C13.3333 10.4778 13.2694 10.3194 13.1416 10.1916C13.0139 10.0639 12.8555 9.99998 12.6666 9.99998C12.4778 9.99998 12.3194 10.0639 12.1916 10.1916C12.0639 10.3194 12 10.4778 12 10.6666C12 10.8555 12.0639 11.0139 12.1916 11.1416C12.3194 11.2694 12.4778 11.3333 12.6666 11.3333Z" fill="#333333" />
				</svg>
				Доставка доступна с {subtract30Minutes(organization.timeworkOrganization.todaytime[1])}
			</button>
			<button disabled className="btn btn-mini btn-gray no-drag">
				Самовывоз доступен до {organization.timeworkOrganization.todaytime[1]}
			</button>
		</>
	))

	statusTSX && statusTSX.ONTimeWork((

		<>
			<button disabled className="btn btn-mini btn-gray no-drag">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4.66665 12.6666C4.11109 12.6666 3.63887 12.4722 3.24998 12.0833C2.86109 11.6944 2.66665 11.2222 2.66665 10.6666H1.99998C1.81109 10.6666 1.65276 10.6028 1.52498 10.475C1.3972 10.3472 1.33331 10.1889 1.33331 9.99998V8.66665C1.33331 7.93331 1.59442 7.30554 2.11665 6.78331C2.63887 6.26109 3.26665 5.99998 3.99998 5.99998H5.99998C6.18887 5.99998 6.3472 6.06387 6.47498 6.19165C6.60276 6.31942 6.66665 6.47776 6.66665 6.66665V9.33331H8.99998L11.3333 6.43331V4.66665H9.99998C9.81109 4.66665 9.65276 4.60276 9.52498 4.47498C9.3972 4.3472 9.33331 4.18887 9.33331 3.99998C9.33331 3.81109 9.3972 3.65276 9.52498 3.52498C9.65276 3.3972 9.81109 3.33331 9.99998 3.33331H11.3333C11.7 3.33331 12.0139 3.46387 12.275 3.72498C12.5361 3.98609 12.6666 4.29998 12.6666 4.66665V6.43331C12.6666 6.58887 12.6416 6.73609 12.5916 6.87498C12.5416 7.01387 12.4722 7.14442 12.3833 7.26665L10.0666 10.1666C9.94442 10.3222 9.78887 10.4444 9.59998 10.5333C9.41109 10.6222 9.21665 10.6666 9.01665 10.6666H6.66665C6.66665 11.2222 6.4722 11.6944 6.08331 12.0833C5.69442 12.4722 5.2222 12.6666 4.66665 12.6666ZM4.66665 11.3333C4.85554 11.3333 5.01387 11.2694 5.14165 11.1416C5.26942 11.0139 5.33331 10.8555 5.33331 10.6666H3.99998C3.99998 10.8555 4.06387 11.0139 4.19165 11.1416C4.31942 11.2694 4.47776 11.3333 4.66665 11.3333ZM3.99998 5.33331C3.81109 5.33331 3.65276 5.26942 3.52498 5.14165C3.3972 5.01387 3.33331 4.85554 3.33331 4.66665C3.33331 4.47776 3.3972 4.31942 3.52498 4.19165C3.65276 4.06387 3.81109 3.99998 3.99998 3.99998H5.99998C6.18887 3.99998 6.3472 4.06387 6.47498 4.19165C6.60276 4.31942 6.66665 4.47776 6.66665 4.66665C6.66665 4.85554 6.60276 5.01387 6.47498 5.14165C6.3472 5.26942 6.18887 5.33331 5.99998 5.33331H3.99998ZM12.6666 12.6666C12.1111 12.6666 11.6389 12.4722 11.25 12.0833C10.8611 11.6944 10.6666 11.2222 10.6666 10.6666C10.6666 10.1111 10.8611 9.63887 11.25 9.24998C11.6389 8.86109 12.1111 8.66665 12.6666 8.66665C13.2222 8.66665 13.6944 8.86109 14.0833 9.24998C14.4722 9.63887 14.6666 10.1111 14.6666 10.6666C14.6666 11.2222 14.4722 11.6944 14.0833 12.0833C13.6944 12.4722 13.2222 12.6666 12.6666 12.6666ZM12.6666 11.3333C12.8555 11.3333 13.0139 11.2694 13.1416 11.1416C13.2694 11.0139 13.3333 10.8555 13.3333 10.6666C13.3333 10.4778 13.2694 10.3194 13.1416 10.1916C13.0139 10.0639 12.8555 9.99998 12.6666 9.99998C12.4778 9.99998 12.3194 10.0639 12.1916 10.1916C12.0639 10.3194 12 10.4778 12 10.6666C12 10.8555 12.0639 11.0139 12.1916 11.1416C12.3194 11.2694 12.4778 11.3333 12.6666 11.3333Z" fill="#333333" />
				</svg>
				Доставка доступна с {organization.timeworkOrganization.todaytime[0]} - {subtract30Minutes(organization.timeworkOrganization.todaytime[1])}
			</button>
			<button className="btn btn-mini btn-gray no-drag" onClick={() => handlerSelectDeliveryTipe(DELIVERY_METODS.PICKUP,organization) }>
				<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.49992 6.08968C8.76152 6.08968 8.98546 5.99654 9.17175 5.81025C9.35804 5.62396 9.45118 5.40002 9.45118 5.13842C9.45118 4.87682 9.35804 4.65288 9.17175 4.46659C8.98546 4.2803 8.76152 4.18716 8.49992 4.18716C8.23832 4.18716 8.01438 4.2803 7.82809 4.46659C7.6418 4.65288 7.54866 4.87682 7.54866 5.13842C7.54866 5.40002 7.6418 5.62396 7.82809 5.81025C8.01438 5.99654 8.23832 6.08968 8.49992 6.08968ZM8.49992 10.6676C8.4365 10.6676 8.37308 10.6557 8.30967 10.632C8.24625 10.6082 8.19076 10.5765 8.1432 10.5368C6.98583 9.51423 6.12176 8.56495 5.55101 7.68899C4.98025 6.81304 4.69487 5.99456 4.69487 5.23355C4.69487 4.04447 5.07736 3.09717 5.84233 2.39165C6.6073 1.68613 7.49317 1.33337 8.49992 1.33337C9.50667 1.33337 10.3925 1.68613 11.1575 2.39165C11.9225 3.09717 12.305 4.04447 12.305 5.23355C12.305 5.99456 12.0196 6.81304 11.4488 7.68899C10.8781 8.56495 10.014 9.51423 8.85664 10.5368C8.80908 10.5765 8.75359 10.6082 8.69017 10.632C8.62675 10.6557 8.56334 10.6676 8.49992 10.6676Z" fill="#333333" />
					<path fill-rule="evenodd" clip-rule="evenodd" d="M4.77721 8.86042C5.15538 9.08102 5.28311 9.56641 5.06252 9.94458L3.53832 12.5575H13.4615L11.9373 9.94458C11.7167 9.56641 11.8445 9.08102 12.2226 8.86042C12.6008 8.63982 13.0862 8.76756 13.3068 9.14573L14.9701 11.9971C15.525 12.9483 14.8388 14.1429 13.7375 14.1429H3.26229C2.16103 14.1429 1.47488 12.9483 2.02977 11.9971L3.69305 9.14573C3.91365 8.76756 4.39904 8.63982 4.77721 8.86042Z" fill="#333333" />
				</svg>
				Самовывоз доступен до {organization.timeworkOrganization.todaytime[1]}
			</button>
		</>
	))


	statusTSX && statusTSX.DeliveryPickUP((

		<>
			<button className="btn btn-mini btn-gray no-drag" onClick={() => handlerSelectDeliveryTipe(DELIVERY_METODS.COURIER,organization) }>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4.66665 12.6666C4.11109 12.6666 3.63887 12.4722 3.24998 12.0833C2.86109 11.6944 2.66665 11.2222 2.66665 10.6666H1.99998C1.81109 10.6666 1.65276 10.6028 1.52498 10.475C1.3972 10.3472 1.33331 10.1889 1.33331 9.99998V8.66665C1.33331 7.93331 1.59442 7.30554 2.11665 6.78331C2.63887 6.26109 3.26665 5.99998 3.99998 5.99998H5.99998C6.18887 5.99998 6.3472 6.06387 6.47498 6.19165C6.60276 6.31942 6.66665 6.47776 6.66665 6.66665V9.33331H8.99998L11.3333 6.43331V4.66665H9.99998C9.81109 4.66665 9.65276 4.60276 9.52498 4.47498C9.3972 4.3472 9.33331 4.18887 9.33331 3.99998C9.33331 3.81109 9.3972 3.65276 9.52498 3.52498C9.65276 3.3972 9.81109 3.33331 9.99998 3.33331H11.3333C11.7 3.33331 12.0139 3.46387 12.275 3.72498C12.5361 3.98609 12.6666 4.29998 12.6666 4.66665V6.43331C12.6666 6.58887 12.6416 6.73609 12.5916 6.87498C12.5416 7.01387 12.4722 7.14442 12.3833 7.26665L10.0666 10.1666C9.94442 10.3222 9.78887 10.4444 9.59998 10.5333C9.41109 10.6222 9.21665 10.6666 9.01665 10.6666H6.66665C6.66665 11.2222 6.4722 11.6944 6.08331 12.0833C5.69442 12.4722 5.2222 12.6666 4.66665 12.6666ZM4.66665 11.3333C4.85554 11.3333 5.01387 11.2694 5.14165 11.1416C5.26942 11.0139 5.33331 10.8555 5.33331 10.6666H3.99998C3.99998 10.8555 4.06387 11.0139 4.19165 11.1416C4.31942 11.2694 4.47776 11.3333 4.66665 11.3333ZM3.99998 5.33331C3.81109 5.33331 3.65276 5.26942 3.52498 5.14165C3.3972 5.01387 3.33331 4.85554 3.33331 4.66665C3.33331 4.47776 3.3972 4.31942 3.52498 4.19165C3.65276 4.06387 3.81109 3.99998 3.99998 3.99998H5.99998C6.18887 3.99998 6.3472 4.06387 6.47498 4.19165C6.60276 4.31942 6.66665 4.47776 6.66665 4.66665C6.66665 4.85554 6.60276 5.01387 6.47498 5.14165C6.3472 5.26942 6.18887 5.33331 5.99998 5.33331H3.99998ZM12.6666 12.6666C12.1111 12.6666 11.6389 12.4722 11.25 12.0833C10.8611 11.6944 10.6666 11.2222 10.6666 10.6666C10.6666 10.1111 10.8611 9.63887 11.25 9.24998C11.6389 8.86109 12.1111 8.66665 12.6666 8.66665C13.2222 8.66665 13.6944 8.86109 14.0833 9.24998C14.4722 9.63887 14.6666 10.1111 14.6666 10.6666C14.6666 11.2222 14.4722 11.6944 14.0833 12.0833C13.6944 12.4722 13.2222 12.6666 12.6666 12.6666ZM12.6666 11.3333C12.8555 11.3333 13.0139 11.2694 13.1416 11.1416C13.2694 11.0139 13.3333 10.8555 13.3333 10.6666C13.3333 10.4778 13.2694 10.3194 13.1416 10.1916C13.0139 10.0639 12.8555 9.99998 12.6666 9.99998C12.4778 9.99998 12.3194 10.0639 12.1916 10.1916C12.0639 10.3194 12 10.4778 12 10.6666C12 10.8555 12.0639 11.0139 12.1916 11.1416C12.3194 11.2694 12.4778 11.3333 12.6666 11.3333Z" fill="#333333" />
				</svg>
				Доставка
			</button>
			<button className="btn btn-mini btn-gray no-drag" onClick={() => handlerSelectDeliveryTipe(DELIVERY_METODS.PICKUP,organization) }>
				<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.49992 6.08968C8.76152 6.08968 8.98546 5.99654 9.17175 5.81025C9.35804 5.62396 9.45118 5.40002 9.45118 5.13842C9.45118 4.87682 9.35804 4.65288 9.17175 4.46659C8.98546 4.2803 8.76152 4.18716 8.49992 4.18716C8.23832 4.18716 8.01438 4.2803 7.82809 4.46659C7.6418 4.65288 7.54866 4.87682 7.54866 5.13842C7.54866 5.40002 7.6418 5.62396 7.82809 5.81025C8.01438 5.99654 8.23832 6.08968 8.49992 6.08968ZM8.49992 10.6676C8.4365 10.6676 8.37308 10.6557 8.30967 10.632C8.24625 10.6082 8.19076 10.5765 8.1432 10.5368C6.98583 9.51423 6.12176 8.56495 5.55101 7.68899C4.98025 6.81304 4.69487 5.99456 4.69487 5.23355C4.69487 4.04447 5.07736 3.09717 5.84233 2.39165C6.6073 1.68613 7.49317 1.33337 8.49992 1.33337C9.50667 1.33337 10.3925 1.68613 11.1575 2.39165C11.9225 3.09717 12.305 4.04447 12.305 5.23355C12.305 5.99456 12.0196 6.81304 11.4488 7.68899C10.8781 8.56495 10.014 9.51423 8.85664 10.5368C8.80908 10.5765 8.75359 10.6082 8.69017 10.632C8.62675 10.6557 8.56334 10.6676 8.49992 10.6676Z" fill="#333333" />
					<path fill-rule="evenodd" clip-rule="evenodd" d="M4.77721 8.86042C5.15538 9.08102 5.28311 9.56641 5.06252 9.94458L3.53832 12.5575H13.4615L11.9373 9.94458C11.7167 9.56641 11.8445 9.08102 12.2226 8.86042C12.6008 8.63982 13.0862 8.76756 13.3068 9.14573L14.9701 11.9971C15.525 12.9483 14.8388 14.1429 13.7375 14.1429H3.26229C2.16103 14.1429 1.47488 12.9483 2.02977 11.9971L3.69305 9.14573C3.91365 8.76756 4.39904 8.63982 4.77721 8.86042Z" fill="#333333" />
				</svg>
				Самовывоз
			</button>
		</>
	))


	

	return (
		<div className="institute-buttons">

			{
				switchMetod && switchMetod()
			}
			<OrganizationTableRestaurant organization={organization} />
			{
				organization.delivery !== "NOWORK" &&
				<button className="btn btn-mini no-drag gomenu" onClick={()=>handlerSelectMenu(organization)}>Перейти в меню</button>
			}
			{
				organization.delivery === "NOWORK" && (organization.redirect && organization.redirect.redirectON) &&
				<button className="btn btn-mini no-drag gomenu" onClick={()=>handlerSelectMenu(organization)}>Перейти в меню</button>
			}
			
		</div>
	)
}
export default observer(OrganizationTipeDelivery)


/*
return (
		<div className="institute-buttons">
			
			{
				organization.deliveryTipe.map((type: IDeliveryTypes) => {
					console.log(type);
					if (organization.timeworkOrganization.typework === 'ONWORK' && type.metod === DELIVERY_METODS.COURIER) {
						return (
							<button key={type.metod} disabled className="btn btn-mini btn-gray no-drag">
								<img src={icons(type.metod)} alt="" />
								{type.name}
							</button>
						)
					}
					return (
						<NavLink to={"/shop"} key={type.metod} onClick={() => handlerSelectDeliveryTipe(type)} className="btn btn-mini btn-gray no-drag">
							<img src={icons(type.metod)} alt="" />
							{type.name}
						</NavLink>
					)
				})
			}
			<NavLink to={`/shop?address=${organization.info.city},${organization.info.address}`} className="btn btn-mini btn-gray no-drag gomenu">Посмотреть меню</NavLink>
		</div>
	)

*/