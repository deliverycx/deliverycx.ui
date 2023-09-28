import React, {FC, useEffect, useRef, useState} from 'react';
import Draggable from "react-draggable"
import { ReactNode } from 'react';

type IProps = {
	setIsOpened:any
	children:any
	data?:any
}

const ModalCard:FC<IProps> = ({setIsOpened, children, data}) => {
    const wrapperRef = useRef<any>()
    const [positionY, setPositionY] = useState(720);
    const handleClick = (event:any) => {
        if (wrapperRef.current && wrapperRef.current === event.target) {
            setIsOpened(false);
        }
    };

    const handleDrag = (e:any, data:any) => {
        if (data.y >= (data.node.clientHeight / 3.5)) {
            setPositionY(data.node.clientHeight)
            setTimeout(() => {
                setIsOpened(false)
            }, 300)
        }
    };

    useEffect(() => {
        if (wrapperRef.current) {
						const doc = document.querySelector('.react-draggable')
            doc && setPositionY(doc.getBoundingClientRect().height)
            setTimeout(() => {
                setPositionY(0)
            }, 100)
        }
    }, [])

    return (
        <div onClick={(e) => handleClick(e)} ref={wrapperRef} className="modal__bg">
            <Draggable
                axis="y"
                onStop={handleDrag}
                position={{x:0, y: positionY}}
                bounds={{top: 0}}
                cancel=".no-drag"
            >
							<div className="modal">
								{children}
							</div>
                
            </Draggable>
        </div>
    );
};

export default ModalCard;