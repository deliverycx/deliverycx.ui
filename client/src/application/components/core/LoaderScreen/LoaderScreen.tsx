import React from "react";

const LoaderScreen = () => {
    return (
        <div className="loader-screen">
            <header>
                <span className="hink-logo"/>
            </header>
            <main className="main-loader-text">
                <div className="first-line">Здесь <br/>рождаются</div>
                <div className="hink">хинкали</div>
            </main>
            <div className="finder-loading-animation-container">
                <div className="finder-loading-animation">
                    <div id="hink-1" className="spinner"></div>
                    <div id="hink-2" className="spinner"></div>
                    <div id="hink-3" className="spinner"></div>
                    <div id="hink-4" className="spinner"></div>
                    <div id="hink-5" className="spinner"></div>
                    <div id="hink-6" className="spinner"></div>
                    <div id="hink-7" className="spinner"></div>
                    <div id="hink-8" className="spinner"></div>
                    <div id="hink-9" className="spinner"></div>
                </div>
            </div>
        </div>
    );
};

export default LoaderScreen;
