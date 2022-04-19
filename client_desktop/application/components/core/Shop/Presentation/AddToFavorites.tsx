import { FC, memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { debounce } from "lodash";
import { RequestShop } from "servises/repository/Axios/Request";

interface IProps {
    id: string,
    isFav: boolean,
    _class: string,
    handlfav:any
}

const AddToFavorites: FC<IProps> = ({ id, isFav, _class,handlfav}) => {
    
    const favoriteCN = cn(_class, { favorite_active: isFav });
    

  

    return <button className={favoriteCN} onClick={() => handlfav(id)}></button>
}

export default memo(AddToFavorites);