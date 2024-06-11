import { IsNotEmpty, IsString, IsBoolean, IsNumber } from "class-validator";


export class CitysEntiti {
	@IsNotEmpty()
	id!: string;

	@IsString()
	cityname!: string;

	@IsBoolean()
	isHidden!: boolean;

	@IsNumber()
	countOrganization!: number;
}

export type ICitys = CitysEntiti
