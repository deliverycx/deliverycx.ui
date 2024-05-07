import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import cn from 'classnames';

type IProps = {
	setIsOpened: any;
	children: any;
	theme?: string | null;
	title?: string
};
const ModalDesctop: FC<IProps> = ({ setIsOpened, children, theme, title }) => {

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	const handleClose = () => {
		setIsOpened(false)
	}

	const CN = cn(`modal__bg`, { modaldesc__bg_childen: theme == 'children' }, { modal__bg_childenpre: theme == 'children-pre' });

	return createPortal(
		<>
			<div className={CN} onClick={handleClose}></div>
			<div className="modal_desctop">
				<div className="modal__wrapper-desc">
					<div className="modal__header">
						<svg className="no-drag" onClick={() => setIsOpened(false)} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M30.3 17.71C29.91 17.32 29.28 17.32 28.89 17.71L24 22.59L19.11 17.7C18.72 17.31 18.09 17.31 17.7 17.7C17.31 18.09 17.31 18.72 17.7 19.11L22.59 24L17.7 28.89C17.31 29.28 17.31 29.91 17.7 30.3C18.09 30.69 18.72 30.69 19.11 30.3L24 25.41L28.89 30.3C29.28 30.69 29.91 30.69 30.3 30.3C30.69 29.91 30.69 29.28 30.3 28.89L25.41 24L30.3 19.11C30.68 18.73 30.68 18.09 30.3 17.71Z" fill="#8D191D" />
						</svg>
						<h3>{title}</h3>
					</div>
					{
						children
					}
				</div>

			</div>
		</>
		, document.body
	)
}
export default ModalDesctop