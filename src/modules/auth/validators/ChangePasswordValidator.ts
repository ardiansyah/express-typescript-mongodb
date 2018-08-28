import { IsNotEmpty } from 'class-validator';

export class ChangePasswordValidator {

  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  confirmPassword: string;
}