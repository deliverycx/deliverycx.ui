/* eslint-disable react/no-unknown-property */
import Footer from "application/components/common/Footer/Footer";
import Header from "application/components/common/headers/Header";
import SlideBar from "application/components/common/SlideBar/SlideBar";
import Stocks from "application/components/common/Stocks/Stocks";
import LocationLayout from "application/components/core/Location/LocationLayout";
import ShopLayout from "application/components/core/Shop/ShopLayout";

import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { fetchUser } from "servises/redux/slice/profileSlice";

const Home: NextPage = () => {
  
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(fetchUser() as any)
	},[])
    return (
        <>
            <LocationLayout />
            <div className="container">
                <Header />
                <Stocks />
            </div>
        
            <ShopLayout />
            
            <Footer />
        </>
    );
};

export default Home;

