/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Link from "next/link";
import Footer from "../../application/components/common/Footer/Footer";
import CheckOutLayout from "../../application/components/core/Cart/CheckoutLayout";
import BasketLayout from "../../application/components/core/Cart/BasketLayout";

const Pravorazdel = () => {
    return (
        <>
            <section className="pravo_page">
                <div className="container">
                    <div className="header">
                        <div className="header__left">
                            <Link href="/">
                                <img className="header_logo" src="../images/logo-top.svg" alt="" />
                            </Link>
                        </div>
                        <div className="back_shop"><Link href="/">
                            Вернуться в меню
                        </Link></div>
                    </div>

                    <div className='text_atom'>
                        Правовая информация
                    </div>

                    <div className='hrefs'>
                        <div className={'href'}>
                            <a href='/docs/Пользовательское%20соглашение.pdf' target='_blank'>Пользовательское соглашение</a>
                        </div>
                        <br/>
                        <div className={'href'}>
                            <a href="/docs/cx.pdf" target='_blank'>Условия обработки персональные данных</a>
                        </div>
                        <br/>
                        <div className={'href'}>
                            <a href="/docs/Порядок%20возврата.pdf" target='_blank'>Порядок возврата</a>
                        </div>
                        <br/>

                        <div className={'href'}>
                            <a href="/docs/Акции%20сети%20кафе.pdf" target='_blank'>Акция сети кафе</a>
                        </div>
                        <br/>

                        <div className={'href'}>
                            <a href="/docs/Порядок_приобретения_и_использования_Подарочных_сертификатов_1_1.docx" target='_blank'>Порядок приобретения и использования Подарочных сертификатов</a>
                        </div>
                        <br/>

                        <div className={'href'}>
                            <a href="/docs/Региональная%20Акция%20Приведи%20друга.pdf" target='_blank'>Региональная акция- Приведи друга</a>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
};

export default Pravorazdel;