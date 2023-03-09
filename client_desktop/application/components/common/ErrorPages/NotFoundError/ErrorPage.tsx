import React from "react";
import Header from "../../headers/Header";
import ErrorContainer from "./ErrorContainer";

const ErrorPage = () => {
  return (
    <>
      <div className="container">
        <Header />
        <ErrorContainer />
      </div>
    </>
  );
};

export default ErrorPage;
