import { imgRoutDef } from 'application/helpers/imgAdmin';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { FC, memo } from 'react';

type IProps = {
	organization: IOrganization
}

const OrganizationCardFilter: FC<IProps> = ({ organization }) => {

	return (
		<>
			<div className="institute-specification">
				{
					organization.filters.map((value) => {
						return (
							<div key={value._id} className="institute-specification__item active">
								{
									value.images &&
									<img src={imgRoutDef(value.images[0])} alt="" />
								}
								
								{value.name}
							</div>
						)
					})
				}
			</div>
		</>
	)
}
export default memo(OrganizationCardFilter)