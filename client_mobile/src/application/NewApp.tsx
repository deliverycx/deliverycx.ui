
import { useDispatch } from 'react-redux';
import { setTest } from 'servises/redux/slice/test.slice';
import { handlerTest } from './handlertest';
import { createContext, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { store } from 'servises/redux/createStore';
import Hoce from './Hoce';
import Dno from './Dno';
import { myTimer } from './mob';
import { observer } from 'mobx-react-lite';
import { myName } from './mobtwo';



export const ThemeContext: any = createContext({});
const NewApp = (): JSX.Element => {
	const names = myName

	const handl = () =>{
		const observable = handlerTest.getSiti()
		
	}

	return (
		<>
			<button onClick={handl}>siti</button>
			<span>nama === {names.store.foo}</span> 
		</>
	
	)
}

export default observer(NewApp);
