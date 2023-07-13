
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

import "reflect-metadata";
import React from 'react';
import HOCCity from './components/core/City/HOC.City';




export const ThemeContext: any = createContext({});
const App = (): JSX.Element => {
	

	

	return (
		<>
			<HOCCity />

		</>
	
	)
}

export default observer(App);
