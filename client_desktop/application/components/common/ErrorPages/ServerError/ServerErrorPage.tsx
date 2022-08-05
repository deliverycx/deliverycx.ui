import React from "react";
import Header from "../../headers/Header";
import ServerErrorContainer from "./ServerErrorContainer";

const ServerErrorPage = () => {
  return (
    <>
      <div className="container">
        <Header />
        <ServerErrorContainer />
      </div>
    </>
  );
};

export default ServerErrorPage;
