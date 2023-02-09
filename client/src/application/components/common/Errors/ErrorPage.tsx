import React from "react";

const ErrorPage = () => {
    return (
        <div className="error-container">
            <span className="error-server-img"/>
            <h2 className="server">Сайт временно<br/>
не работает
                </h2>
            <div>Приносим свои извинения за неудобства.
Оформить заказ вы можете по телефону в хинкальной.</div>
            <div className="buttons">
                
                <button className="reload-page-btn" onClick={()=>window.location.reload()}>Обновить страницу</button>
            </div>
        </div>
    );
};

export default ErrorPage;
