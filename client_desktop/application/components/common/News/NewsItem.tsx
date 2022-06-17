import { imgRoutDef } from "application/helpers/imgInit";
import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";
import LoaderProduct from "../Loaders/loaderProduct";


const NewsItem = () => {
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
											<a href={val}><img className="about-comp_grind-item--img"
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

export default NewsItem;
