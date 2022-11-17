import { imgRoutDef } from "application/helpers/imgInit";
import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";
import LoaderProduct from "../Loaders/loaderProduct";


const NewsItems = () => {
	const [baners,setBaners] = useState<any | null>(null)
	const point = adapterSelector.useSelectors((selector) => selector.point);

	const settings = {
		className: 'slider-company-news',
		infinite: true,
		slidesToShow: 3,
		speed: 500,
		rows: 1,
	};

	const getStocks = async () =>{
		try {
			const {data}:any = await RequestAdmin.bannersList(point.guid)
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
			getStocks()
		},[point.guid])

	return (
		<>
			{
				baners
					? <Slider {...settings}>
						{
							baners.sort((a: any, b: any) => (a.order - b.order)).map((val: any) => {
								return (
									<div key={val._id} className="coruselus">
										<div className="about-comp_grind-item">
											<a href={val.url} target="_blank" rel="noreferrer"><img className="about-comp_grind-item--img"
																						 src={imgRoutDef(val.
																							smallimages[0])} /></a>
										</div>
									</div>
								);
							})
						}
					</Slider>
					: <LoaderProduct />
			}
		</>
	);
}

export default NewsItems;
