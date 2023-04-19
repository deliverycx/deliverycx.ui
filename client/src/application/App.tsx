import NestedRoute from "./routes/NestedRoute";



const App = (): JSX.Element => {
	/*
  useEffect(() => {
    SocketSingle.newsocket('http://localhost:5000/iiko') //process.env.REACT_APP_STOPLIST as string
      .subscribers<IStopList>('stoplist_event', (data: IStopList | null, error: boolean) => {
				console.log('solettt',data,error);
        if (!error) {
          dispatch(setStopList(data))
          dispatch(fetchRefreshCart())
        }
      })
      
  },[])
	*/




	return (
    <>
      <NestedRoute />
    </>
	)
}

export default App;
