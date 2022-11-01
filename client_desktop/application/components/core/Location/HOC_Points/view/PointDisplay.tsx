import { FC } from "react";

const PointDisplay:FC<{setter:any}> = ({setter}) =>{
	return (
			<div className="notification_modal notification_work-time">
							<div className="attention">
									Привет!
							</div>
							<div className="attention-info">
									Оформление онлайн заказа в данной <br /> хинкальной недоступно.
							</div>
							<div className="secondary-text">
									А пока вы можете ознакомится с нашим меню<br/> и почитать новости
							</div>
							<div className="notification_worktime-buttons">
									{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
									<a onClick={() => setter(false)} className="btn-success">Посмотреть меню</a>
							</div>
			</div>
	);
}
export default PointDisplay