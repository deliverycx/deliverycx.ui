import React from "react";

const ServerErrorContainer = () => {
    return (
        <div className="error-container server">
            <div className="error-info-block">
                <span className="error-500"></span>
                <div className="server">Внутренняя ошибка сервера</div>
                <span className="server">Сайт временно недоступен. <br /> Попробуйте обновить страницу или зайти позже.</span>
                <div className="buttons">
                    <button className="reload-page-btn" onClick={()=>window.location.reload()}>
                        Обновить страницу
                    </button>
                    <a className="support-btn" href="https://t.me/@Starik_Khinkalych">
                        Написать в поддержку
                    </a>
                </div>
            </div>
            <div>
                <span className="hink-500"></span>
            </div>
        </div>
    );
};

export default ServerErrorContainer;
