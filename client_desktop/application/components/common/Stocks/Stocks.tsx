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

	const getStocks = async (guid:string) =>{
		try {
			const {data}:any = await RequestAdmin.bannersList(guid)
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
		if(point.guid){
			getStocks(point.guid)
		}else{
			getStocks(process.env.NEXT_PUBLIC_DEFAULT_ORG as string)
		}
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
                        return <a key={val._id} className="stocks__item"  href={val.url} target="_blank" rel="noreferrer"><StocksItem  content={imgRoutDef(val.images[0])} /></a>
                      })
										}
								</Slider>
							: <LoaderProduct />
						}

        </div>
    )
};

export default memo(Stocks);
