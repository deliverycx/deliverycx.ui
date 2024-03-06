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
	const [slidesToShow, setSlidesToShow] = useState(1);

	useEffect(() => {
		const updateSlidesToShow = () => {
			if (window.innerWidth >= 1200) {
				setSlidesToShow(2.3);
			} else if (window.innerWidth >= 900) {
				setSlidesToShow(2);
			} else if (window.innerWidth >= 759) {
				setSlidesToShow(2.3);
			} else if (window.innerWidth >= 600) {
				setSlidesToShow(1.8);
			} else {
				setSlidesToShow(1);
			}
		};

		window.addEventListener("resize", updateSlidesToShow);
		updateSlidesToShow();

		return () => {
			window.removeEventListener("resize", updateSlidesToShow);
		};
	}, []);

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
		console.log(story,index);
		setStoriesIndex(index)

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
		slidesToShow: slidesToShow,
		speed: 500,
		rows: 1,
		slidesPerRow: 1,
		dots: true,
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
						<img className="stories_box-close" width="20" height="20" onClick={()=> handlerStories(null,0)} src={require("assets/images/icons/closestories2.png")} />
						<Stories width="100%" height="100%" onAllStoriesEnd={()=> handlerStories(null,0)} stories={mapStory} />
					</div>
				</div>
			}

		</div>
	)
};

export default memo(Stocks);