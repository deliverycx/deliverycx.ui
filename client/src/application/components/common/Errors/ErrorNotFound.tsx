import React from "react";

const ErrorNotFound = () => {
    return (
        <div className="error-container">
            <span className="error-img"></span>
            <h2>Что-то пошло не так</h2>
            <div>Помогите восстановить порядок. <br/>
                Проверьте подключение к интернету.</div>
            <div className="buttons">
                <a className="hink-spoon-btn" href="https://хинкалыч.рф">Не есть хинкали вилкой</a>
                <button className="reload-page-btn" onClick={()=>window.location.reload()}>Обновить страницу</button>
            </div>
        </div>
    );
};

export default ErrorNotFound;
