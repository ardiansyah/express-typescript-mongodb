import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsUsernameAlreadyExist } from '../../core/validators/IsUserNameAlreadyExist';
import { IsEmailAlreadyExist } from '../../core/validators/IsEmailAlreadyExist';

export class UserModel {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsUsernameAlreadyExist({
    message: 'User already exists with username: $value. Choose another usrname.'
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailAlreadyExist({
    message: 'User already exists with email: $value. Choose another email.'
  })
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  password: string;

  getFullname(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}