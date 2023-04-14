import { FC } from "react";

const NoDeliveryModal:FC<{modal:any}> = ({modal})=>{
	return (
		<div className="notification_modal notification_work-time">
						<div className="attention">
						Привет!
						</div>
						<div className="attention-info">
						Заказ уже недоступен, хинкальная скоро закроется.
						</div>
						<div className="secondary-text">
                    А пока вы можете ознакомится с нашим меню<br/> и почитать новости
                </div>
						<div className="notification_worktime-buttons">
								{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
								<a onClick={()=> modal()} className="btn-success">Продолжить</a>
						</div>
		</div>
	);
}
export default NoDeliveryModal