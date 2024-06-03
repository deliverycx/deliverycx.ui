import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUser, IUserGuest } from './user.type';
import { mappersDTO } from 'application/helpers/mappersDTO';
import { validatorDTO } from 'application/helpers/validatorDTO';
import { UserEntity } from '../domain/user.entity';

export const userDTO = new UserEntity();

export const userMapper = (val: IUserGuest): UserEntity => {
  userDTO.id = val.id;
  userDTO.username = val.username;
  userDTO.phone = val.phone;

  return { ...userDTO };
};
