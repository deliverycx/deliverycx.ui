/* eslint-disable @typescript-eslint/no-var-requires */
import {FC} from "react";
import {useNavigate} from "react-router-dom"

interface IProps{
    children: any,
    backgroundColor?: string,
    onClickCb?: ()=>void
}

const HeaderBack: FC<IProps> = ({children, backgroundColor, onClickCb})=>{
    const navigate = useNavigate();

    return (
        <div className="header-back" style={{backgroundColor}}>
            <div className="container">
                <div className="cart__header">
                    <button onClick={onClickCb ? onClickCb : () => navigate(-1)} className="header-back__return-btn">
                        <img src={require('assets/images/icons/back.svg').default} alt="Вернуться назад" />
                    </button>
                    <div className="header-back__content">
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderBack;