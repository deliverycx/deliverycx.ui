import { FC } from "react";

interface INews{
    title: string;
    idx: number
}

const NewsItem: FC<INews> = ({title, idx}) => {

    return (
        <div className="coruselus">
            <div className="about-comp_grind-item" style={{}}>
                <div className="about-comp_grind-item--but">{title}</div>
            </div>
        </div>
    )
}

export default NewsItem;
