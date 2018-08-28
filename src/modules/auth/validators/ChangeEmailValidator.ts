import { IsNotEmpty, IsEmail } from 'class-validator';

export class ChangeEmailValidator {

  @IsNotEmpty()
  @IsEmail()
  email: string;
}