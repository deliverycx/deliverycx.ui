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
                            <a href="https://drive.google.com/file/d/1SLl16H7gDYGeCAJkzuWt1CoEdCOs2c8v/view" target='_blank'>Пользовательское соглашение</a>
                        </div>
                        <br/>
                        <div className={'href'}>
                            <a href="https://drive.google.com/file/d/1OYfYVZNhkp4J2cVgNAhIGW4CT55Mbnss/view" target='_blank'>Условия обработки персональные данных</a>
                        </div>
                        <br/>
                        <div className={'href'}>
                            <a href="https://drive.google.com/file/d/12sqhlN0m8c5a816inmJxsiruvW6t-Rsf/view" target='_blank'>Порядок возврата</a>
                        </div>
                        <br/>

                        <div className={'href'}>
                            <a href="https://drive.google.com/file/d/1PqdGazUBTwlkAIhXxMjvmxXMQ0pvHphZ/view" target='_blank'>Акция сети кафе</a>
                        </div>
                        <br/>

                        <div className={'href'}>
                            <a href="https://docs.google.com/document/d/11D_gpeN-Wn9lzFzLJdwZtEWGX_GMNPtD/edit" target='_blank'>Порядок приобретения и использования Подарочных сертификатов</a>
                        </div>
                        <br/>

                        <div className={'href'}>
                            <a href="https://drive.google.com/file/d/1HRqHJvBBw0M-mRymYDmbTYPxDbwoNvj3/view" target='_blank'>Региональная акция- Приведи друга</a>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
};

export default Pravorazdel;