import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { animated, useSpring, useTransition } from "react-spring";
import { createPortal } from 'react-dom';
import cn from 'classnames';

type IProps = {
	setIsOpened: any;
	children: any;
	theme?: "children";
};

const ModalCard: FC<IProps> = ({ setIsOpened, children, theme }) => {
	const [isClosing, setIsClosing] = useState(false);

	const [openProps, openApi] = useSpring(
		() => ({
			from: { transform: "translateY(250px)", opacity: 0 },
			to: { transform: "translateY(0px)", opacity: 1 },
			config: { duration: 100 },
		}),
		[]
	);

	const [closeProps, closeApi] = useSpring(
		() => ({
			transform: "translateY(250px)",
			opacity: 0,
			display: "none",
			config: { duration: 100 },
		}),
		[]
	);


	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	const handleClose = () => {
		setIsClosing(true);
		closeApi.start({
			to: async (next) => {
				await next({ transform: "translateY(250px)", opacity: 0, display: "block" });
				setIsOpened(false);
			},
			from: { transform: "translateY(0px)", opacity: 1 },
		});
	};

	const CN = cn('modalbox', { modal__bg_childen: theme });

	return createPortal(
		<div className={CN}>
			<div className="modal__bg" onClick={handleClose}></div>
			<animated.div
				style={isClosing ? closeProps : openProps}
				className="modal"
			>
				{children}
			</animated.div>
		</div>,
		document.body
	);
};

export default ModalCard;
