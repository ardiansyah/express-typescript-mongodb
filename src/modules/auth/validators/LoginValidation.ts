import { IsEmail, IsNotEmpty } from 'class-validator';
import { ICredential } from '../interfaces/ICredentials';

export class LoginValidation {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}