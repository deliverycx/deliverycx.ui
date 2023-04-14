import { FC } from "react";

const OnliPUCKUPModal:FC<{modal:any}> = ({modal}) =>{


	return (
		<div className="notification_modal notification_work-time">
						<div className="attention">
						Внимание!
						</div>
						<div className="attention-info">
							В данный момент доступен <span>самовывоз</span> ,<br/> хинкальная скоро закроется.
						</div>
						
						<div className="notification_worktime-buttons">
								{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
								<a onClick={()=> modal()} className="btn-success">Продолжить</a>
						</div>
		</div>
	);
}
export default OnliPUCKUPModal