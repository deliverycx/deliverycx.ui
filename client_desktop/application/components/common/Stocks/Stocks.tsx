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
			const result1:any = await RequestAdmin.bannersList(point.guid)
			console.log(result1);
			if(result1.data.length !== 0){
				setBaners(result1.data)
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

	console.log(point);


	useEffect(()=>{
		getStocks()
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
											baners.sort((a:any,b:any) => (a.order - b.order)).map((val:any)=>{	
												return <a key={val._id} className="stocks__item"  href={val.url}><StocksItem  content={imgRoutDef(val.images[0])} /></a>
											})
											
										}
								</Slider>
							: <LoaderProduct />
						}
            
        </div>
    )
};

export default memo(Stocks);
