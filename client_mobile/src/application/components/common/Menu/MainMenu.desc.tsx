/* eslint-disable react/no-unknown-property */
import { ROUTE_APP } from 'application/contstans/route.const';
import { useMediaRedirectPoint } from 'application/hooks/useMediaRedirectPoint';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { useQueryClient } from '@tanstack/react-query';
import { hasCities, fetchCities } from 'entities/cities/queries/cities.query';

const MainMenuDesc = () => {
	const navigate = useNavigate();
	const params = useLocation();
	const { redirectToDectPoints } = useMediaRedirectPoint();

	const queryClient = useQueryClient();

	const shophandler = () => {
		const p = redirectToDectPoints();
		p && navigate(ROUTE_APP.SHOP.SHOP_MAIN);
	};

	const pointhandler = () => {
		const p = redirectToDectPoints();
		p && navigate(ROUTE_APP.POINT);
	};

	const CNSHOP = cn('', {
		active: params.pathname == ROUTE_APP.SHOP.SHOP_MAIN,
	});
	const CNPoint = cn('', { active: params.pathname == ROUTE_APP.POINT });

	const handleLinkMouseEnter = async () => {
		if (!hasCities(queryClient)) {
			await fetchCities(queryClient);
		}
	};

	return (
		<div className="menu-desc">
			<a className={CNSHOP} onClick={shophandler}>
				Меню
			</a>
			<NavLink target="_blank" to="https://starikkhinkalich.ru/">
				Новости и акции
			</NavLink>
			<a
				className={CNPoint}
				onClick={pointhandler}
				onMouseEnter={handleLinkMouseEnter}
			>
				Старик Хинкалыч на карте
			</a>
			<NavLink
				target="_blank"
				to="https://docs.google.com/forms/d/e/1FAIpQLScF_kqRIOC4YtZGJnravy94pIEbzlmW4MM3IWhR_tBGLqcQ0g/viewform?pli=1"
			>
				Вакансии
			</NavLink>
			<NavLink
				target="_blank"
				className="franc_menu"
				to="https://франшиза.хинкалыч.рф/"
			>
				<svg
					width="27"
					height="27"
					viewBox="0 0 27 27"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_8806_65257)">
						<path
							d="M21.7267 23.427L3.43095 21.504C3.02121 21.4609 2.72532 21.0826 2.76987 20.6587L3.09245 17.5896C3.137 17.1657 3.50509 16.8572 3.91483 16.9002L22.2106 18.8232C22.6203 18.8662 22.9162 19.2446 22.8716 19.6685L22.5491 22.7377C22.5045 23.1615 22.1364 23.47 21.7267 23.427Z"
							fill="#F0952A"
						/>
						<path
							d="M22.791 20.4345L3.01184 18.3556L4.54411 3.77702C4.57772 3.45729 4.79928 3.19119 5.10035 3.10923C5.40202 3.0283 5.71893 3.14646 5.89716 3.40839L9.88542 9.2711L13.8613 4.32603C14.2028 3.9013 14.8499 3.96932 15.0956 4.45576L17.9565 10.1194L23.0765 5.21396C23.3056 4.99484 23.6408 4.94523 23.9181 5.08701C24.1955 5.22977 24.3569 5.53617 24.3233 5.85585L22.791 20.4345Z"
							fill="#FFA62E"
						/>
						<path
							d="M13.2294 16.3279C12.0024 16.1989 11.1128 15.0614 11.2462 13.7921C11.3796 12.5228 12.4863 11.5951 13.7133 11.7241C14.9403 11.8531 15.8299 12.9906 15.6965 14.2599C15.5631 15.5292 14.4564 16.4568 13.2294 16.3279Z"
							fill="#8D191D"
						/>
						<path
							d="M4.076 15.3669C2.849 15.238 1.95937 14.1005 2.09278 12.8312C2.22619 11.5619 3.33288 10.6342 4.55987 10.7632C5.78687 10.8921 6.6765 12.0296 6.54309 13.2989C6.40968 14.5682 5.303 15.4959 4.076 15.3669Z"
							fill="#8D191D"
						/>
						<path
							d="M22.2106 18.8228L13.0627 17.8613L12.5789 22.4651L21.7267 23.4266C22.1365 23.4696 22.5046 23.1611 22.5491 22.7372L22.8717 19.6681C22.9162 19.2442 22.6203 18.8659 22.2106 18.8228Z"
							fill="#A6671D"
						/>
						<path
							d="M22.7911 20.4361L24.3234 5.85753C24.357 5.5378 24.1956 5.23145 23.9181 5.08868C23.6408 4.9469 23.3056 4.99652 23.0765 5.21564L17.9565 10.121L15.0956 4.45734C14.9728 4.2141 14.7496 4.0755 14.5144 4.05078L12.9015 19.3967L22.7911 20.4361Z"
							fill="#D68725"
						/>
						<path
							d="M15.6911 14.2584C15.8245 12.9891 14.9349 11.8516 13.7079 11.7227L13.224 16.3264C14.451 16.4554 15.5577 15.5277 15.6911 14.2584Z"
							fill="#591012"
						/>
						<path
							d="M22.3719 17.2888C21.1449 17.1599 20.2553 16.0224 20.3887 14.7531C20.5221 13.4838 21.6288 12.5561 22.8558 12.685C24.0828 12.814 24.9724 13.9515 24.839 15.2208C24.7056 16.4901 23.5989 17.4178 22.3719 17.2888Z"
							fill="#591012"
						/>
					</g>
					<defs>
						<clipPath id="clip0_8806_65257">
							<rect
								width="22.8713"
								height="23.66"
								fill="white"
								transform="translate(3.41016 0.296875) rotate(6)"
							/>
						</clipPath>
					</defs>
				</svg>
				Франшиза
			</NavLink>
		</div>
	);
};
export default observer(MainMenuDesc);
