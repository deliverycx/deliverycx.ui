/* eslint-disable @typescript-eslint/no-var-requires */

import { memo, useEffect, useState } from "react";
import StockItem from "./Stocksitem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import { adapterSelector } from "servises/redux/selectors/selectors";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";
import { imgRoutDef } from "application/helpers/imgInit";
import Stories from 'stories-react';
import 'stories-react/dist/index.css';


const Stocks = () => {

		const [baners,setBaners] = useState<any | null>(null)
		const point = adapterSelector.useSelectors((selector) => selector.point);
		const [stories,setStories] = useState<any[] | null>(null)
		const [storiesindex,setStoriesIndex] = useState<number>(0)

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
			point.guid && getStocks()
		},[point.guid])


		const handlerStories = (story:string[] | null,index:number) => {
			const q = document.querySelector(".shop__box") as any
			setStoriesIndex(index)
			if(story){
				setStories(story)
				q.classList.toggle("no-scroll")
			}else{
				setStories(null)
				q.classList.toggle("no-scroll")
			} 
			
		} 

		const mapStory = stories && stories.map((val:string) =>{
			return {
				type: "image",
				url: imgRoutDef(val),
				duration: 5000
			}
		})

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
											baners.sort((a:any,b:any) => (a.order - b.order)).map((val:any,index:number)=>{	
												return <a key={val._id} onClick={()=> handlerStories(val.stories,index)} className="stocks__item"><StockItem  content={imgRoutDef(val.mobimages[0])} /></a>
											})
											
									}
            </Slider>
						{
							mapStory &&
							<div className="stories">
								<div className="stories_box">
									<img className="stories_box-close" onClick={()=> handlerStories(null,0)} src={require("assets/i/smal_close.png").default} />
									<Stories  width="100%" height="100%" onAllStoriesEnd={()=> handlerStories(null,0)} stories={mapStory} />
								</div>
							</div>
						}
            
        </div>
    )
};

export default memo(Stocks);