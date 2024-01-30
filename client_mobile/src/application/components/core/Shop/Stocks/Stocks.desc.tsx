import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { imgRoutDef } from "application/helpers/imgAdmin";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { requestShopAdmin } from "modules/ShopModule/data/shop.request";
import { FC, useState, useEffect } from "react";
import Slider from "react-slick";
import StocksItem from "./Stocksitem";

const StocksDesc:FC<{organization:string}> = ({organization}) =>{
	const [baners,setBaners] = useState<any | null>(null)
	

	const getStocks = async (guid:string) =>{
		try {
			console.log(guid);
			const {data}:any = await requestShopAdmin.bannersList(guid)
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

	const [slidesToShow, setSlidesToShow] = useState("");

	useEffect(() => {
		const updateSlidesToShow = () => {
			if (window.innerWidth >= 1200) {
				setSlidesToShow("200px");
			} else if (window.innerWidth >= 900) {
				setSlidesToShow("50px");
			} else if (window.innerWidth >= 759) {
				setSlidesToShow("25px");
			} else {
				setSlidesToShow("200px");
			}
		};

		window.addEventListener("resize", updateSlidesToShow);
		updateSlidesToShow();

		return () => {
			window.removeEventListener("resize", updateSlidesToShow);
		};
	}, []);



	useEffect(()=>{
		if(organization){
			getStocks(organization)
		}else{
			getStocks(process.env.REACT_APP_DEFAULT_ORG as string)
		}
	},[organization])
		/*
    const settings = {
        className: "center",
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        rows: 1,
        dots: true,
        dotsClass:'stocks__points'
      };
			*/
			const settings = {
				className: "center",
				centerMode: true,
				infinite: true,
				centerPadding: slidesToShow,
				
				speed: 500,
				rows: 1,
				slidesPerRow: 1,
				dots: true,
				dotsClass:'stocks__points'
			};

    return (
        <div className="stocks-desc">
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


export default StocksDesc