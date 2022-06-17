import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'servises/redux/createStore';
import { adapterSelector } from "servises/redux/selectors/selectors";
import { setCiti, setMapModal, setModal, setPoint } from "servises/redux/slice/locationSlice";
import { ROUTE_APP } from 'application/contstans/route.const';
import RequestLocation from "servises/repository/Axios/Request/Request.Location";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";
import { ISocial } from "@types";

export function useLocations(this: any){
  const dispatch = useDispatch()
  const router = useRouter()
  const modal = useSelector((state: RootState) => state.location.locationModal)
  const modalMap = useSelector((state: RootState) => state.location.locationMap)
  const selectedCity = adapterSelector.useSelectors((selector) => selector.city);
  const [showCiti, setShow] = useState(true)
  const [youSity, setYouSyty] = useState(false)
  

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



	const byOrg = async (org:string) =>{
		
		const {data}:any = await RequestLocation.geBuOrg(org)
		if(data){
			console.log(data);
			const res = await RequestLocation.geBuCity(data.cityid._id)
			if(res.status === 200){
				dispatch(setCiti(res.data));
				dispatch(setPoint(data));
				router.push(ROUTE_APP.MENU)
			}
			
		}
	}
    

  useEffect(() => {
    if (Object.keys(selectedCity).length) {
      setShow(false)
    }
  }, [selectedCity]);

  useEffect(() => {
    if (Object.keys(selectedCity).length && router.asPath === ROUTE_APP.MAIN) {
      setYouSyty(true)
    }
  }, []);


	useEffect(() => {
    const queryOrg = router.query.organuzation as string
		queryOrg && byOrg(queryOrg)
  }, [router.query]);


  this.data({
    modal,
    showCiti,
    modalMap,
    youSity
  })
  this.handlers({
    handlerCloseModal,
    handlerCloseMapModal,
    handlerMapModal,
    handlerModal,
    handlerGoToCity,
    setShow,
    setYouSyty
  })
  this.status({
  })
}

export function useHeaderLocations(this: any) {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
	const [social, setSoclial] = useState<ISocial | null>(null)
  const selectedCity = adapterSelector.useSelectors(selector => selector.city)
  const selectedPoint = adapterSelector.useSelectors(selector => selector.point)
  

	const getSocial = async (id:string) =>{
		const response = await RequestAdmin.social(id)
		
		if(response.status === 200 && response.data){	
			setSoclial(response.data)
		}else{
			setSoclial(null)
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


  const handlerHeader = () => {
    dispatch(setModal(true))
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