import { FC, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive'

type IProps = {

	children:ReactNode
}



export const isDesctomMediaQuery = () => useMediaQuery({ minWidth: Number(process.env.REACT_APP_MEDIAQUERY_DESC) })

export const Mobile:FC<IProps> = ({ children }) => {
	
  const isMobile = useMediaQuery({ maxWidth: 780 })
	console.log('mob',isMobile);
  return isMobile ? children : null
}

export const Desktop:FC<IProps> = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: Number(process.env.REACT_APP_MEDIAQUERY_DESC) })
	console.log('desc',isDesktop);
  return isDesktop ? children : null
}