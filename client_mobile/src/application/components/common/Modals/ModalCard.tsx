import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { animated, useSpring, useTransition } from "react-spring";
import { createPortal } from 'react-dom';
import cn from 'classnames';
import Draggable from 'react-draggable';
import { Desktop, Mobile, isDesctomMediaQuery } from 'application/ResponseMedia';

type IProps = {
	setIsOpened: any;
	children: any;
	theme?: "children" | null;
	styles?:string
};

const ModalCard: FC<IProps> = ({ setIsOpened, children, theme,styles }) => {

	const [isClosing, setIsClosing] = useState(false);
	const descQuery = isDesctomMediaQuery()

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
		//setIsClosing(true);
		closeApi.start({
			to: async (next) => {
				await next({ transform: "translateY(250px)", opacity: 0, display: "block" });
				setPositionY(1200)
				tikRef.current = setTimeout(() => {
					setIsOpened(false);
					setIsClosing(true);
				}, 200)
			},
			from: { transform: "translateY(0px)", opacity: 1 },
		});
	};

	const CN = cn('modalbox', { modal__bg_childen: theme });
	

	const wrapperRef = useRef()
	const tikRef = useRef<any>()

	const [positionY, setPositionY] = useState(720);


	const handleDrag = (e: any, data: any) => {
		if (data.y >= (data.node.clientHeight / 3.5)) {
			setPositionY(data.node.clientHeight)
			tikRef.current = setTimeout(() => {
				setIsOpened(false)
				setIsClosing(true);
			}, 300)
		}
	};

	useEffect(() => {
		const doc = document.querySelector('.react-draggable')
		doc && setPositionY(doc.getBoundingClientRect().height)
		tikRef.current = setTimeout(() => {
			setPositionY(0)
		}, 100)

		return () => clearTimeout(tikRef.current)
	}, [])

	return createPortal(
		<>
			<Desktop>
				<div className={CN}>
					<div className="modal__bg" onClick={handleClose}></div>
					<div className={`modal modal_desc ${styles || ''}`}>
						{children}
					</div>
				</div>
			</Desktop>
			<Mobile>
				<div className={CN}>
					<div className="modal__bg" onClick={handleClose}></div>
					<Draggable
						axis="y"
						onStop={handleDrag}
						position={{ x: 0, y: positionY }}
						bounds={{ top: 0 }}
						cancel=".no-drag"
						handle=".modal-draggles"

					>
						{
							<animated.div
								style={isClosing ? closeProps : openProps}
								className="modal"

							>
								<strong className="modal-draggles"></strong>
								{children}
							</animated.div>

						}

					</Draggable>
				</div>
			</Mobile>
		</>,
		document.body
	);


};

export default ModalCard;
