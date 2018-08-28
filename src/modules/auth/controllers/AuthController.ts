import { Post, Controller, Body, Res, JsonController, Req, NotAcceptableError } from 'routing-controllers';
import { ICredential } from '../interfaces/ICredentials';
import { AuthService } from '../services/AuthService';
import { IRegister } from '../interfaces/IRegister';
import { LoginValidation } from '../validators/LoginValidation';
import { validate } from 'class-validator';
import { ValidationError } from '../../core/exceptions/ValidationError';
import { PassportAuthService } from '../../core/services/PassportAuthService';
import { NextFunction } from 'express';
import { UserModel } from '../../user/models/UserModel';

@JsonController('/auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private passportService: PassportAuthService
  ) {}

  @Post('/login')
  async login(@Body({ validate: true }) login: LoginValidation, @Res() res: any, @Req() req: any, next: NextFunction) {
    // return res.json(login);
    // const rules = new LoginValidation(login);
    // const validation = await validate(rules);
    // if (validation) return new ValidationError(validation);

    const data = await this.authService.login(login);
    return res.json(data);

    // const auth = awaitthis.authService.authenticateStrategy(req, res, next);

    // return res.json(auth);
  }

  @Post('/register')
  async register(@Body() body: UserModel, @Res() res: any) {
    try {
      const user = await this.authService.register(body);
      return res.json(user);
    } catch (err) {
      throw new NotAcceptableError(err.message);
    }
  }
}