/* eslint-disable @typescript-eslint/no-var-requires */

import { FC, memo, useEffect, useState } from "react";
import StockItem from "./Stocksitem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

import Stories from 'stories-react';
import 'stories-react/dist/index.css';
import { imgRoutDef } from "application/helpers/imgAdmin";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { requestShopAdmin } from "modules/ShopModule/data/shop.request";


const Stocks:FC<{organization:IOrganization}> = ({organization}) => {

	const [baners,setBaners] = useState<any | null>(null)
	
	const [stories,setStories] = useState<any[] | null>(null)
	const [storiesindex,setStoriesIndex] = useState<number>(0)

	const getStocks = async () =>{
		try {
			const {data}:any = await requestShopAdmin.bannersList(organization.guid) //fe470000-906b-0025-00f6-08d8de6557e1 //point.guid 
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
		organization.guid && getStocks()
	},[organization.guid])


	const handlerStories = (story:string[] | null,index:number) => {
		//const q = document.querySelector(".shop__box") as any
		setStoriesIndex(index)
		console.log(story);
		if(story?.length !== 0){
			setStories(story)

		}else{
			setStories(null)
			
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
			slidesToShow: 3,
			speed: 500,
			rows: 1,
			slidesPerRow: 1,
			dots: false,
			dotsClass:'stocks__points'
		};

		
		console.log(mapStory);
		
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
								<img className="stories_box-close" onClick={()=> handlerStories(null,0)} src={require("assets/images/icons/closestories.svg")} />
								<Stories  width="100%" height="100%" onAllStoriesEnd={()=> handlerStories(null,0)} stories={mapStory} />
							</div>
						</div>
					}
					
			</div>
	)
};

export default memo(Stocks);