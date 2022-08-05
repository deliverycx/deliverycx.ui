import React from "react";

const ErrorContainer = () => {
  return (
    <div className="error-container">
      <div className="error-info-block">
        <span className="error"></span>
        <div>Что-то пошло не так</div>
        <span>Помоги восстановить порядок</span>
        <button className="error-btn" onClick={()=>window.location.reload()}>
          Не есть хинкали вилкой
        </button>
      </div>
      <div>
        <span className="fork-hink"></span>
      </div>
    </div>
  );
};

export default ErrorContainer;
