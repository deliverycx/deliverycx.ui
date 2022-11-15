import { FC, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

type IProps = {
  onClose?:any
	noscrole?:boolean
  children:ReactNode
}

const Modals:FC<IProps> = ({onClose,noscrole = false,children}) => {

  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
		if(!noscrole){
			document.body.className = "no-scroll";
		}
    setIsBrowser(true);
    return () => {
      document.body.className = "";
    }
  }, []);


  const modalContent = (
    <div className="modal">
      <div className="modal_overlay" onClick={onClose}></div>
      {children}
    </div>
  )

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.body
    );
  } else {
    return null;
  }

}
export default Modals
