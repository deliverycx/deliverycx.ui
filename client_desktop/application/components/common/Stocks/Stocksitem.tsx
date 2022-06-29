import { FC } from "react";

interface IStock{
    content: string
}

const StocksItem: FC<IStock> = ({content}) => {


    return (
        <img src={content} />
    )
}

export default StocksItem;