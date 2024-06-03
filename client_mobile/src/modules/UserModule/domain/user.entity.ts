import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { IUserGuest } from '../interfaces/user.type';

export class UserEntity {
  @IsNotEmpty()
  id!: string;

  @IsString()
  username!: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
