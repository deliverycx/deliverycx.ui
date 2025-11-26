/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Mobile } from 'application/ResponseMedia'
import HeaderBack from '../../common/HeaderBack/HeaderBack'

const Pravorazdel = () => {
	return (
		<div>
			<Mobile>
				<HeaderBack>
					<div className="header__logo">
						<img src={require('assets/images/logo.jpg')} alt="Логотип" />
					</div>
				</HeaderBack>
			</Mobile>

			<div className="text_atom_mobile">Правовая информация</div>

			<div className="hrefs_mobile">
				<div className={'href_mobile'}>
					<a href="/docs/Пользовательское%20соглашение.pdf" target="_blank">
						Пользовательское соглашение
					</a>{' '}
				</div>
				<br />
				<div className={'href_mobile'}>
					<a href="/docs/cx.pdf" target="_blank">
						Условия обработки персональные данных
					</a>{' '}
				</div>
				<br />
				<div className={'href_mobile'}>
					<a href="/docs/Порядок%20возврата.pdf" target="_blank">
						Порядок возврата
					</a>
				</div>
				<br />



				<div className={'href_mobile'}>
					<a
						href="/docs/Порядок_приобретения_и_использования_Подарочных_сертификатов_1_1.docx"
						target="_blank"
					>
						Порядок приобретения и использования Подарочных сертификатов
					</a>{' '}
				</div>
				<br />
				<div className={'href_mobile'}>
					<a
						href="/docs/Руководство_по_акциям_и_спецпредложениям.pdf"
						target="_blank"
					>
						Руководство по акциям и спецпредложениям
					</a>{' '}
				</div>
				<br />

				<div className={'href_mobile'}>
					<a href="/docs/Правила посещения хинкальной.docx" target="_blank">
						Правила посещения хинкальной
					</a>{' '}
				</div>
				<br />

				<div className={'href_mobile'}>
					<a href="/docs/Оферта.pdf" target="_blank">
						Оферта
					</a>{' '}
				</div>
				<br />

				<div className={'href_mobile'}>
					<a
						href="https://disk.yandex.ru/d/hEhmaLjHWWwBRw"
						target="_blank"
					>
						Условия акций
					</a>{' '}
				</div>
			</div>
		</div>
	);
};

export default Pravorazdel;
