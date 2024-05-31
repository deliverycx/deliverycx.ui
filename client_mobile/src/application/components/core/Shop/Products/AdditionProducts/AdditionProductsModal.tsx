import ModalDesctop from "application/components/common/Modals/ModalDesc/ModalsDesctop"
import { FC } from "react"
import HOCAdditionProducts from "./HOC.AdditionProducts"
import ModalCard from "application/components/common/Modals/ModalCard";
import { ROUTE_APP } from "application/contstans/route.const";
import { useNavigate } from "react-router-dom";

const AdditionProductsModal: FC<{ setIsOpened: any }> = ({ setIsOpened }) => {
	const navigate = useNavigate()

	const handlerGoOrder = () =>{
		setIsOpened(false)
		navigate(ROUTE_APP.ORDER.ORDER_MAIN)
	}

	return (
		<>
			<div className="modal__bg" onClick={() => setIsOpened(false)}></div>
				<div className="modal_desctop addtionalproduct_modal">
					<div className="addtionalproduct_modal_box">
					<div className="addtionalproduct_modal_head">
						<div className="addtionalproduct_modal_head-img">
							<svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4.99935 19C4.71602 19 4.45769 18.9125 4.22435 18.7375C3.99102 18.5625 3.83269 18.3333 3.74935 18.05L0.949353 7.95C0.86602 7.71667 0.90352 7.5 1.06185 7.3C1.22019 7.1 1.43269 7 1.69935 7H6.74935L11.1494 0.45C11.2327 0.316667 11.3494 0.208333 11.4994 0.125C11.6494 0.0416667 11.8077 0 11.9744 0C12.141 0 12.2994 0.0416667 12.4494 0.125C12.5994 0.208333 12.716 0.316667 12.7994 0.45L17.1994 7H22.2994C22.566 7 22.7785 7.1 22.9369 7.3C23.0952 7.5 23.1327 7.71667 23.0494 7.95L20.2494 18.05C20.166 18.3333 20.0077 18.5625 19.7744 18.7375C19.541 18.9125 19.2827 19 18.9994 19H4.99935ZM11.9994 15C12.5494 15 13.0202 14.8042 13.4119 14.4125C13.8035 14.0208 13.9994 13.55 13.9994 13C13.9994 12.45 13.8035 11.9792 13.4119 11.5875C13.0202 11.1958 12.5494 11 11.9994 11C11.4494 11 10.9785 11.1958 10.5869 11.5875C10.1952 11.9792 9.99935 12.45 9.99935 13C9.99935 13.55 10.1952 14.0208 10.5869 14.4125C10.9785 14.8042 11.4494 15 11.9994 15ZM9.17435 7H14.7994L11.9744 2.8L9.17435 7Z" fill="#8D191D" />
							</svg>
						</div>
						<div className="addtionalproduct_modal_head-close" onClick={() => setIsOpened(false)}>
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M13.3007 0.70875C12.9107 0.31875 12.2807 0.31875 11.8907 0.70875L7.0007 5.58875L2.1107 0.69875C1.7207 0.30875 1.0907 0.30875 0.700703 0.69875C0.310703 1.08875 0.310703 1.71875 0.700703 2.10875L5.5907 6.99875L0.700703 11.8887C0.310703 12.2787 0.310703 12.9087 0.700703 13.2987C1.0907 13.6887 1.7207 13.6887 2.1107 13.2987L7.0007 8.40875L11.8907 13.2987C12.2807 13.6887 12.9107 13.6887 13.3007 13.2987C13.6907 12.9087 13.6907 12.2787 13.3007 11.8887L8.4107 6.99875L13.3007 2.10875C13.6807 1.72875 13.6807 1.08875 13.3007 0.70875Z" fill="#8D191D" />
							</svg>
						</div>
					</div>
					<div className="addtionalproduct_modal_container">
						<HOCAdditionProducts />
					</div>
					
					
					</div>
					<div className="addtionalproduct_modal_box-btn">
					<button className="addtionalproduct_modal-btn" onClick={handlerGoOrder}>Продолжить</button>
					</div>
				</div>
			

		</>
	)
}
export default AdditionProductsModal