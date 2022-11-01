import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'servises/redux/createStore';
import { adapterSelector } from "servises/redux/selectors/selectors";
import { setCiti, setMapModal, setModal, setPoint } from "servises/redux/slice/locationSlice";
import { ROUTE_APP } from 'application/contstans/route.const';
import RequestLocation from "servises/repository/Axios/Request/Request.Location";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";
import { ICity, ISocial,IPoint } from "@types";
import { workTimeHelp } from "application/helpers/workTime";

export function useLocations(this: any){
  const dispatch = useDispatch()
  const router = useRouter()
  const modal = useSelector((state: RootState) => state.location.locationModal)
  const modalMap = useSelector((state: RootState) => state.location.locationMap)
  const selectedCity = adapterSelector.useSelectors((selector) => selector.city);
	const point = adapterSelector.useSelectors((selector) => selector.point);

  const [showCiti, setShow] = useState(true)
  const [youSity, setYouSyty] = useState(false)
	const [selectCity, setSelectCity] = useState<ICity | Object>({})
	const [workOrg, setWorkOrg] = useState(false)
	const [displayOrg, setDisplayOrg] = useState(false)
  

  const handlerCloseModal = () => {
   	dispatch(setModal(false))
  }
  const handlerCloseMapModal = () => {
    dispatch(setMapModal(false))
  }

  const handlerModal = (value: boolean) => {
    dispatch(setModal(value))
  }
  const handlerMapModal = (value:boolean) => {
    dispatch(setMapModal(value))
  }
  const handlerGoToCity = () => {
    dispatch(setModal(true))
    dispatch(setMapModal(false))
    setShow(true)
  }

	const handleSelectCity = (city:ICity) => {
		setSelectCity(city)
		setShow(false)
	}
	const handleSelectOrganitztion = (address:IPoint) => {
		dispatch(setCiti(selectCity));
		dispatch(setPoint(address));
	}


	//таргетерная
	const byOrg = async (org:string) =>{
		
		const {data}:any = await RequestLocation.geBuOrg(org)
		if(data){
			const res = await RequestLocation.geBuCity(data.cityid._id)
			if(res.status === 200){
				dispatch(setCiti(res.data));
				dispatch(setPoint(data));
				router.push(ROUTE_APP.MENU)
			}
			
		}
	}
    
	// 
  useEffect(() => {
    if (Object.keys(selectedCity).length) {
      setSelectCity(selectedCity)
			//setShow(false)
    }
  }, [selectedCity]);

	// выбранный город
  useEffect(() => {
    if (Object.keys(selectedCity).length && router.asPath === ROUTE_APP.MAIN) {
      setYouSyty(true)
    }
  }, []);

	// переключение на точки и город
	useEffect(() => {
		const loc = router.query.location
    if (Object.keys(selectedCity).length && loc) {
      if(loc === 'point'){
				setShow(false)
			}else if(loc === 'city'){
				setShow(true)
			}
    }
  }, [router.query.location]);


	// таргетерная ссылка
	useEffect(() => {
    const queryOrg = router.query.organuzation as string
		queryOrg && byOrg(queryOrg)
  }, [router.query]);

	// время работы организации
	useEffect(() => {
		const worktime = router.query.worktime as string

    if(!modal && !modalMap){
			setWorkOrg(workTimeHelp)
		}
		if(worktime){
			setWorkOrg(false)
		}
  }, [modal,modalMap,router.query.worktime]);


	// закрыта точка или нет
	useEffect(() => {
		point.delivMetod === 'NODELIVERY' && setDisplayOrg(true)
  }, [point]);


  this.data({
    modal,
    showCiti,
    modalMap,
    youSity,
		selectCity,
		workOrg,
		displayOrg
  })
  this.handlers({
    handlerCloseModal,
    handlerCloseMapModal,
    handlerMapModal,
    handlerModal,
    handlerGoToCity,
		handleSelectOrganitztion,
		handleSelectCity,
    setShow,
    setYouSyty,
		setWorkOrg,
		setDisplayOrg
  })
  this.status({
  })
}

export function useHeaderLocations(this: any) {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
	const router = useRouter()
	const [social, setSoclial] = useState<ISocial | null>(null)
  const selectedCity = adapterSelector.useSelectors(selector => selector.city)
  const selectedPoint = adapterSelector.useSelectors(selector => selector.point)
  

	const getSocial = async (id:string) =>{
		try {
			const response = await RequestAdmin.social(id)
			
			if(response.status === 200 && response.data){	
				setSoclial(response.data)
			}else{
				setSoclial(null)
			}
		} catch (error) {
			console.log(error);
		}
		
	}



  useEffect(() => {
    if (Object.keys(selectedCity).length) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [])

	useEffect(() => {
		selectedPoint.guid && getSocial(selectedPoint.guid)
  }, [selectedPoint.guid])


  const handlerHeader = (location:string) => {
    dispatch(setModal(true))
		router.push(`?location=${location}`)
  }


  
  this.data({
		social,
    show,
    selectedCity,
    selectedPoint
  })
  this.handlers({
    handlerHeader
  })
}