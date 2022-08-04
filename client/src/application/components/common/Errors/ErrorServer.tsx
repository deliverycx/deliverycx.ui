import React from "react";

const ErrorServer = () => {
    return (
        <div className="error-container">
            <span className="error-server-img"/>
            <h2 className="server">Внутренняя <br/>
                ошибка сервера</h2>
            <div>Сайт временно не доступен. <br/> Попробуйте обновить страницу <br/>
                или зайти позже.</div>
            <div className="buttons">
                <a className="hink-spoon-btn" href="https://t.me/@Starik_Khinkalych">Не есть хинкали вилкой</a>
                <button className="reload-page-btn" onClick={()=>window.location.reload()}>Обновить страницу</button>
            </div>
        </div>
    );
};

export default ErrorServer;
