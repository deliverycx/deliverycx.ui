/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @typescript-eslint/no-var-requires */
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack";

const Pravorazdel = () => {
    return (
        <div>
            <HeaderBack>
                <div className="header__logo"><img src={require("assets/img/hink-logo-map.svg").default} alt="Логотип" /></div>
            </HeaderBack>

            <div className='text_atom_mobile'>
                Правовая информация
            </div>

            <div className='hrefs_mobile'>
                <div className={'href_mobile'}>
                    <a href="https://drive.google.com/file/d/1SLl16H7gDYGeCAJkzuWt1CoEdCOs2c8v/view" target='_blank'>Пользовательское соглашение</a>
                </div>
                <br/>
                <div className={'href_mobile'}>
                    <a href="https://drive.google.com/file/d/1OYfYVZNhkp4J2cVgNAhIGW4CT55Mbnss/view" target='_blank'>Условия обработки персональные данных</a>
                </div>
                <br/>
                <div className={'href_mobile'}>
                    <a href="https://drive.google.com/file/d/12sqhlN0m8c5a816inmJxsiruvW6t-Rsf/view" target='_blank'>Порядок возврата</a>
                </div>
                <br/>

                <div className={'href_mobile'}>
                    <a href="https://drive.google.com/file/d/1PqdGazUBTwlkAIhXxMjvmxXMQ0pvHphZ/view" target='_blank'>Акция сети кафе</a>
                </div>
                <br/>

                <div className={'href_mobile'}>
                    <a href="https://docs.google.com/document/d/11D_gpeN-Wn9lzFzLJdwZtEWGX_GMNPtD/edit" target='_blank'>Порядок приобретения и использования Подарочных сертификатов</a>
                </div>
                <br/>

                <div className={'href_mobile'}>
                    <a href="https://drive.google.com/file/d/1HRqHJvBBw0M-mRymYDmbTYPxDbwoNvj3/view" target='_blank'>Региональная акция- Приведи друга</a>
                </div>
            </div>

        </div>
    );
};

export default Pravorazdel;