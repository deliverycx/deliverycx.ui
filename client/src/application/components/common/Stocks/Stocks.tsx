
import { memo, useEffect, useState } from "react";
import StockItem from "./Stocksitem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import { adapterSelector } from "servises/redux/selectors/selectors";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";
import { imgRoutDef } from "application/helpers/imgInit";


const Stocks = () => {

		const [baners,setBaners] = useState<any | null>(null)
		const point = adapterSelector.useSelectors((selector) => selector.point);

		const getStocks = async () =>{
			try {
				const result1:any = await RequestAdmin.bannersList(point.guid)
				
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


		useEffect(()=>{
			point.guid && getStocks()
		},[point.guid])
    
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "25px",
        slidesToShow: 1,
        speed: 500,
        rows: 1,
        slidesPerRow: 1,
        dots: true,
        dotsClass:'stocks__points'
      };
    return (
        <div className="stocks">

          <Slider {...settings}>
									{
											baners &&
											baners.sort((a:any,b:any) => (a.order - b.order)).map((val:any)=>{	
												return <a key={val._id} className="stocks__item"  href={val.url}><StockItem  content={imgRoutDef(val.mobimages[0])} /></a>
											})
											
									}
            </Slider>
            
        </div>
    )
};

export default memo(Stocks);