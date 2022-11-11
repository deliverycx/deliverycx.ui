
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
				const {data}:any = await RequestAdmin.bannersList('fe470000-906b-0025-00f6-08d8de6557e1') //fe470000-906b-0025-00f6-08d8de6557e1 //point.guid 
				const ban = data.reduce((acc:any,val:any,index:number) =>{
					
					val.groopbanner.map((ban:any) =>{
						
						acc = acc.concat(ban.banners)
					})
					acc = acc.concat(val.banners)
					return acc
				},[])
				setBaners(ban)
				
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
												return <a key={val._id} className="stocks__item"><StockItem  content={imgRoutDef(val.mobimages[0])} /></a>
											})
											
									}
            </Slider>
            
        </div>
    )
};

export default memo(Stocks);