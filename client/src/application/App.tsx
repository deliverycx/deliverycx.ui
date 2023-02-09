import NestedRoute from "./routes/NestedRoute";
import { useEffect } from 'react';
import SocketSingle from "servises/Socket/SocketClient";
import { useDispatch } from 'react-redux';
import { setStopList } from "servises/redux/slice/shopSlice";
import { IStopList } from "@types";
import { fetchRefreshCart } from "servises/redux/slice/cartSlice";

import { ROUTE_APP } from "./contstans/route.const";
import { useHistory } from "react-router-dom";




const App = (): JSX.Element => {
	/**/
	const history = useHistory();
  const dispatch = useDispatch()
	/*
  useEffect(() => {
    SocketSingle.newsocket(process.env.REACT_APP_STOPLIST as string)
      .subscribers<IStopList>('stoplist_event', (data: IStopList | null, error: boolean) => {
        if (!error) {
          dispatch(setStopList(data))
          dispatch(fetchRefreshCart())
        }
      })

      
  },[])
	*/
	useEffect(() =>{
		//history.push(ROUTE_APP.ERROR)
		//window.location.href = ROUTE_APP.ERROR as string
	},[])
	//window.location.href = ROUTE_APP.ERROR as string
	

	return (
    <>
      <NestedRoute />
    </>
	)
}

export default App;
