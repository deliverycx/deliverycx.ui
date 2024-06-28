import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrganizationStatusEntity {
	@IsNotEmpty()
	@IsString()
	organization!: string;

	@IsNotEmpty()
	deliveryMetod!: string[];

	@IsNotEmpty()
	paymentMetod!: string[];

	@IsNotEmpty()
	@IsString()
	organizationStatus!: string;

	@IsNotEmpty()
	@IsNumber()
	deliveryTime: number
}
