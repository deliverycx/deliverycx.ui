/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/no-unknown-property */
import Footer from "application/components/common/Footer/Footer";
import Header from "application/components/common/headers/Header";
import SlideBar from "application/components/common/SlideBar/SlideBar";
import Stocks from "application/components/common/Stocks/Stocks";
import LocationLayout from "application/components/core/Location/LocationLayout";
import MainShopLayout from "application/components/core/Shop/MainShopLayout";
import ShopLayout from "application/components/core/Shop/ShopLayout";

import type { NextPage } from "next";
import Head from "next/head";
import { useDispatch } from "react-redux";

const Home: NextPage = () => {
  
    return (
        <>
						<Head>
							<script src='/met.js'/>
							<noscript><img src="https://vk.com/rtrg?p=VK-RTRG-1591066-9fa2W" className="metrika" alt=""/></noscript>
							<script src='/yan.js'/>
							<noscript><div><img src="https://mc.yandex.ru/watch/91135511" className="metrika" /></div></noscript>
						
						</Head>
            <LocationLayout />
            <div className="container">
                <Header />
                <Stocks />
            </div>
        
            <MainShopLayout />
            
            <Footer />
        </>
    );
};

export default Home;

