import {
	IsNotEmpty,
	IsObject,
	IsBoolean,
	IsString,
	IsOptional,
	IsArray,
} from 'class-validator';
import { OrganizationFilters } from '../../interfaces/types/organization.type';

export class OrganizationEntity {
	@IsNotEmpty()
	id!: string;

	@IsObject()
	info!: {
		address: string;
		cords: number[];
		phone: string;
		city: string;
	};

	@IsBoolean()
	isHidden!: boolean;

	@IsObject()
	redirect!: {
		redirectUrl: string;
		redirectON: boolean;
	};

	@IsNotEmpty()
	workTime!: string | string[];

	@IsString()
	guid!: string;

	@IsString()
	temital!: string;

	@IsOptional()
	delivery!: string | null;

	@IsArray()
	gallery!: string[] | [];

	@IsBoolean()
	reservetable!: boolean;

	filters!: OrganizationFilters[] | [];
}
