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
                            <a href="https://storage.3.basecamp.com/4076489/blobs/b464e9b4-7173-11ee-8469-36ef172d8ce0/download/%D0%9F%D0%BE%D1%80%D1%8F%D0%B4%D0%BE%D0%BA_%D0%BF%D1%80%D0%B8%D0%BE%D0%B1%D1%80%D0%B5%D1%82%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B8_%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_%D0%9F%D0%BE%D0%B4%D0%B0%D1%80%D0%BE%D1%87%D0%BD%D1%8B%D1%85_%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D0%B2_1_1.docx" target='_blank'>Порядок приобретения и использования Подарочных сертификатов</a>
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