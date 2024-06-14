import { FC, useMemo } from "react"
import { Placemark } from "react-yandex-maps"
import { IOrganization } from "shared/module/organizations/interfaces/types/organization.type"
import placemark from 'assets/images/icons/placemark.svg';

type IProps = {
	organization: IOrganization
}
const OrganizationsPlacemarkMap: FC<IProps> = ({ organization }) => {

	const adress = useMemo(() => {
		function isNumberPair(arr: number[]): arr is [number, number] {
			return Array.isArray(arr) &&
				arr.length === 2 &&
				typeof arr[0] === 'number' &&
				typeof arr[1] === 'number';
		}
		if (organization && organization.info) {
			if (isNumberPair(organization.info.cords)) {
				return [organization.info.cords[1], organization.info.cords[0]]
			}
		}
		return [0, 0]
	}, [organization])

	const placeMarkOption = {
		iconLayout: 'default#image',
		iconImageHref: placemark,
		iconImageSize: [44, 60],
		iconImageOffset: [-20, -35],
	};

	const placemarkClick = () => {
		console.log(organization);
	}

	return (
		<Placemark
			onClick={placemarkClick}
			key={organization.guid}
			options={placeMarkOption}
			geometry={adress}
		/>
	)
}
export default OrganizationsPlacemarkMap