import Footer from "application/components/common/Footer/Footer";
import Header from "application/components/common/headers/Header";
import React from "react";

const ErrorPage = () => {
  return (
		<>
    <div className="container">
			<Header />
			<h1>404 =)</h1>
			<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&amp;start=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
    </div>
		<br />
		<Footer />
		</>
  );
};

export default ErrorPage;
