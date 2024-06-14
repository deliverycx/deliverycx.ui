import { FC, ReactNode } from "react"
import { Icon } from "shared/ui/Icons"

type IProps = {
	children: ReactNode
	handlerNavigate: () => void
	iconName?: string
}
const TopbarHeadMobile: FC<IProps> = ({ children, handlerNavigate, iconName }) => {
	return (
		<div onClick={handlerNavigate} className="map__topbar map__topbar__fixed">
			<div className="map__topbar-btn">
				<Icon
					className="absolute text-secondary left-3 top-2.5"
					symbol={"arrow_back"}
				/>
			</div>
			<h3>{children}</h3>
		</div>
	)
}
export default TopbarHeadMobile