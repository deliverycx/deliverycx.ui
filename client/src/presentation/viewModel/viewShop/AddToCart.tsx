/* eslint-disable prefer-const */
import { FC, memo, useMemo, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import debounce from 'lodash.debounce';
import { useSpring, animated, config } from 'react-spring'
import { useAddToCartMutation } from "servises/repository/RTK/RTKCart";
import { RequestCart } from "servises/repository/Axios/Request";
import { fetchAddToCart } from "servises/redux/slice/cartSlice";
import { IProduct } from '@types';

interface IProps { 
		product: IProduct,
    _class:string,
    groupImage?: string
}

const AddToCart: FC<IProps> = ({ product,_class, groupImage }) => {
    const dispatch = useDispatch();
    const [addCart,{data,isLoading}] = useAddToCartMutation()

    
    const springRef = useRef<any>();
    let queryCartRef = useRef<any>();
    const [style, animate] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 0,
        config: {duration: 750, mass: 1, tension: 2000, friction: 2700 },
    }));
    
    const root = document.querySelector("#root") as HTMLElement;
    const AnimateHandle = () => {
        try{
            if(springRef.current && queryCartRef.current && root){
                animate({
                    x: - (springRef.current.offsetLeft - 70),
                    y: - (springRef.current.offsetTop - (queryCartRef.current.offsetTop + root.scrollTop)),
                    opacity: 1,
                    loop: {
                        x: 0,
                        y: 0,
                        opacity: 0,
                        immediate: true,
                    }
                })
            }else{
                throw Error();
            }
            
        }catch(e){
            console.log(e)
        }
				console.log(product);
        dispatch(fetchAddToCart(product))
        
        //addCart(id)
    }
    const debouncedChangeHandler = debounce(AnimateHandle, 400)
    
    useEffect(()=>{
        queryCartRef.current = document.querySelector('.link-to-cart') as HTMLElement;
    }, [])
    return (
        <>
        <div className="hot_box" ref={springRef} onClick={debouncedChangeHandler}>  
            <animated.div className="hot" style={{...style, backgroundImage: `url(${groupImage})`}} />
            <button className={_class}></button>
        </div>    
        </>
    )
}

export default memo(AddToCart);