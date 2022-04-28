import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-scroll";
import cn from "classnames";

const LogoMini = () => {
    const [isLogoVisible, setIsLogoVisible] = useState(false);
    const emptyCN = cn("categories__item logo-mini", { islogominivisible: isLogoVisible });

    const onScroll = useCallback(debounce(() => {
        const docu = document.documentElement.scrollHeight - 500
        const scrolis = Math.round(window.scrollY)

        if (scrolis && docu > scrolis) {
            !isLogoVisible && setIsLogoVisible(true)
        } else {
            setIsLogoVisible(false);
        }
    }, 100), []);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    return (
        <div className='categories__logo-mini'>
            <Link className={emptyCN} to="header" smooth={true}></Link>
        </div>
    )
}

export default LogoMini;
