import { memo, useEffect, useState } from "react";
import StockItem from "./Stocksitem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";
import { adapterSelector } from 'servises/redux/selectors/selectors';
import LoaderProduct from "../Loaders/loaderProduct";
import { imgRout, imgRoutDef } from "application/helpers/imgInit";
import StocksItem from "./Stocksitem";


const Stocks = () => {
	const [baners,setBaners] = useState<any | null>(null)
	const point = adapterSelector.useSelectors((selector) => selector.point);

	const getStocks = async () =>{
		try {
			const {data} = await RequestAdmin.bannersList(point.guid)
			console.log(data);
			if(data){
				setBaners(data)
			}else{
				const result = await RequestAdmin.bannersList('all')
				if(result.data){
					setBaners(result.data)
				}else{
					setBaners(null)
				}
			}
		} catch (error) {
			console.log(error);
		}
		
	}

	console.log(baners);

	useEffect(()=>{
		point.guid && getStocks()
	},[point.guid])

    const settings = {
        className: "center",
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        rows: 1,
        dots: true,
        dotsClass:'stocks__points'
      };

    return (
        <div className="stocks">
						{
							baners 
							? <Slider {...settings}>
										{
											baners.images.map((val:string)=>{
												return <StocksItem key={val} content={imgRoutDef(val)} />
											})
											
										}
								</Slider>
							: <LoaderProduct />
						}
            
        </div>
    )
};

export default memo(Stocks);
