import { FC } from "react";

const PointDisplay:FC<{setter:any}> = ({setter}) =>{
	return (
			<div className="notification_modal notification_work-time">
							<div className="attention">
									Привет!
							</div>
							<div className="attention-info">
										Хинкальная только открылась и готовится <br /> к подключению онлайн-заказов 
							</div>
							<div className="secondary-text">
									Сейчас вы можете ознакомиться с нашим меню, просмотреть новости и узнать об актуальных акциях
							</div>
							<div className="notification_worktime-buttons">
									{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
									<a onClick={() => setter(false)} className="btn-success">Посмотреть меню</a>
							</div>
			</div>
	);
}
export default PointDisplay