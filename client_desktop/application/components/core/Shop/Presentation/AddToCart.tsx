/* eslint-disable prefer-const */
import { FC, memo, useMemo, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import debounce from 'lodash.debounce';
import { useSpring, animated, config } from 'react-spring'
import { RequestCart } from "servises/repository/Axios/Request";
import { ReactNode } from 'react';
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCaseShopAddToCard } from "domain/use-case/useCaseShop";
import { imgRout } from "application/helpers/imgInit";

interface IProps { 
    id: string,
    _class:string,
    groupImage: string
    children?:ReactNode
}

const AddToCart: FC<IProps> = ({ id, _class, groupImage, children }) => {
  const useCaseProductCard = adapterComponentUseCase(useCaseShopAddToCard,id)
  const {  } = useCaseProductCard.handlers
  
  const springRef = useRef<any>();
  let queryCartRef = useRef<any>();
  const [style, animate] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 0,
        config: {duration: 750, mass: 1, tension: 2000, friction: 2700 },
  }));

  const root = document.querySelector("html") as HTMLElement;
  const AnimateHandle = () => {
    try {

        if(springRef.current && queryCartRef.current && root){
            animate({
                x: ((queryCartRef.current.offsetLeft - springRef.current.offsetLeft) + 70),
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
            console.log('fail')
        }
        
    }catch(e){
        console.log(e)
    }
    
    //addCart(id)
  }

  const debouncedChangeHandler = debounce(AnimateHandle, 400)

  useEffect(()=>{
    queryCartRef.current = document.querySelector('.categories__item__cart') as HTMLElement;
  }, [])
  
  
    
    return (
        <>
        <div className="hot_box" ref={springRef}  onClick={debouncedChangeHandler}>  
          <animated.div className="hot" style={{...style, backgroundImage: `url(${imgRout(groupImage)})`}} />
            <button className={_class}></button>
        </div>    
        </>
    )
}

export default memo(AddToCart);