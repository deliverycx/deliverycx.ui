import { FC } from "react";
import { useHistory } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import Stocks from "../Stocks/Stocks";

const PersonalProfileScreen: FC = () => {
    const history = useHistory();
    return (
        <div className="personal-profile">
            <div className="main-info">
                <div className="settings-greeting">
                    <div className="greeting">
                        <span>Гамарджоба!</span>
                        <h2>Евгения</h2>
                    </div>
                    <button className="settings-btn" onClick={()=>{
                        console.log('clicked');}}>
                            <SettingsIcon sx={{color: '#BDBDBD'}}/>
                    </button>
                </div>
                <div className="profile-menu">
                    <div className="profile-menu-item">
                        <div className="title">История <br /> заказов</div>
                        <div className="icon-container">
                            <span className="point-icon"/>
                        </div>
                    </div>
                    <div className="profile-menu-item">
                        <div className="title">Адреса <br />доставки</div>
                        <div className="icon-container">
                            <span className="point-icon"/>
                        </div>
                    </div>
                    <div className="profile-menu-item">
                        <div className="title">Персональные <br />акции</div>
                        <div className="icon-container">
                            <span className="percent-icon"/>
                        </div>
                    </div>
                    <div className="profile-menu-item">
                        <div className="title">Хинкалики</div>
                        <div className="icon-container">
                            <span className="point-icon"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stocks">
                <span className="stocks-title">Акции</span>
                <Stocks/>
            </div>
        </div>
    )
}

export default PersonalProfileScreen;
