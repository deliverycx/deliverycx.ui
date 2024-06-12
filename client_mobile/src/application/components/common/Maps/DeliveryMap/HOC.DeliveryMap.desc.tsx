import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { observer } from 'mobx-react-lite';
import React from 'react';
import DeliveryAdress from './DeliveryAdress';
import DeliveryAdressSelect from './DeliveryAdressSelect';
import { useDeliveryMapViewModel } from './DeliveryMap.viewModel';
import DeliveryYMaps from './DeliveryYMaps';
import { DeliveryMapContext } from './HOC.DeliveryMap';
import ModalCard from '../../Modals/ModalCard';

const HOCDeliveryMapDesc = () => {
	const useCase = adapterComponentUseCase(useDeliveryMapViewModel);
	const { point, adress } = useCase.data;
	const { navigate } = useCase.handlers;

	const [modalStreet, setModalStreet] = React.useState(false);

	return (
		<ModalCard
			setIsOpened={() => navigate(-1)}
			theme={null}
			styles="deliverymap-desc-modal"
		>
			<DeliveryMapContext.Provider value={useCase}>
				<div className="deliverymap-desc">
					{point && !modalStreet && (
						<>
							<div className="map__topbar map__topbar__fixed">
								<div className="map__topbar-btn" onClick={() => navigate(-1)}>
									<img
										src={require('assets/images/icons/arrow_back.png')}
										alt=""
									/>
								</div>
								<h3>
									{point.info.city}
									{adress && `, ${adress}`}
								</h3>
							</div>

							<DeliveryYMaps />
							<DeliveryAdress
								openModalAdress={true}
								setModalStreet={setModalStreet}
							/>
						</>
					)}
					{point && modalStreet && (
						<DeliveryAdressSelect setModalStreet={setModalStreet} />
					)}
				</div>
			</DeliveryMapContext.Provider>
		</ModalCard>
	);
};
export default observer(HOCDeliveryMapDesc);
