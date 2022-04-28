import { FC } from "react";

interface INews{
    imgUrl: string;
}

const NewsItem: FC<INews> = ({imgUrl}) => {

    return (
        <div className="coruselus">
            <div className="about-comp_grind-item">
                <img className="about-comp_grind-item--img" src={imgUrl} />
            </div>
        </div>
    )
}

export default NewsItem;
