import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { animated, useSpring, useTransition } from "react-spring"
import { createPortal } from 'react-dom';

type IProps = {
	setIsOpened: any
	children: any
	theme?: "children"
}

const ModalCard: FC<IProps> = ({ setIsOpened, children, theme }) => {


	const [props, api] = useSpring(
		() => ({
			from: { transform: "translateY(250px)", transition: "0.01s" },
			to: { transform: "translateY(0px)" },
		}),
		[]
	)


	const handlerClose = () => {
		setIsOpened(false)
	}

	return createPortal((<div>
		<div className="modal__bg" onClick={handlerClose}></div>
		{
			<animated.div style={props} className="modal">
				<div className="modal">
					{children}
				</div>
			</animated.div>
		}
	</div>
	),document.body)
};

export default ModalCard;