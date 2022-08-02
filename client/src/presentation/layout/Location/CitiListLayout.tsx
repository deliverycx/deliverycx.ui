/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, ReactNode } from "react";

const CitiListLayout:FC<{children:ReactNode}> = ({children}) => (
    <div className="welcome">
        <div className="welcome__header">
            <div className="container row justify-between align-center">
                <div className="welcome__header__content">
                    <img
                        src={require("assets/img/logo-choose-city.svg").default}
                        alt="Доставка и самовывоз"
                    />
                    <span className="choose">Выберите <span className="select-red">город</span></span>
                </div>
            </div>
        </div>
        {children}
    </div >
)
export default CitiListLayout;
