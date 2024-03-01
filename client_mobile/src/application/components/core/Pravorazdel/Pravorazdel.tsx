/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @typescript-eslint/no-var-requires */

import HeaderBack from "../../common/HeaderBack/HeaderBack";

const Pravorazdel = () => {
    return (
        <div>
            <HeaderBack>
                <div className="header__logo"><img src={require("assets/images/logo.jpg")} alt="Логотип" /></div>
            </HeaderBack>

            <div className='text_atom_mobile'>
                Правовая информация
            </div>

            <div className='hrefs_mobile'>
                <div className={'href_mobile'}>
                    <a href='/docs/Пользовательское%20соглашение.pdf' target='_blank'>Пользовательское соглашение</a> </div>
                <br/>
                <div className={'href_mobile'}>
                    <a href="/docs/cx.pdf" target='_blank'>Условия обработки персональные данных</a> </div>
                <br/>
                <div className={'href_mobile'}>
                    <a href="/docs/Порядок%20возврата.pdf" target='_blank'>Порядок возврата</a></div>
                <br/>

                <div className={'href_mobile'}>
                    <a href="/docs/Акции%20сети%20кафе.pdf" target='_blank'>Акция сети кафе</a> </div>
                <br/>

                <div className={'href_mobile'}>
                    <a href="/docs/Порядок_приобретения_и_использования_Подарочных_сертификатов_1_1.docx" target='_blank'>Порядок приобретения и использования Подарочных сертификатов</a> </div>
                <br/>

								<div className={'href_mobile'}>
                    <a href="https://disk.yandex.ru/d/4kazVwmdSm85HQ" target='_blank'>Правила посещения хинкальной</a> </div>
                <br/>
								

                <div className={'href_mobile'}>
                    <a href="/docs/Региональная%20Акция%20Приведи%20друга.pdf" target='_blank'>Региональная акция- Приведи друга</a> </div>
            </div>
        </div>
    );
};

export default Pravorazdel;